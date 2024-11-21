import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import {Play, Pause, Download, Share2} from 'lucide-react-native';
import Share from 'react-native-share';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useGifDetails} from '../hooks/useGifDetails';
import {useTheme} from '../context/ThemeContext';
import GifDetailsLoadingSkeleton from '../components/GifDetailsLoadingSkeleton';
import {requestStoragePermission} from '../utils/storagePermissions';
import ErrorMessage from '../components/ErrorMessage';
import DownloadModal from '../components/DownloadModal';
import RNFS from 'react-native-fs';
import LoadingOverlay from '../components/LoadingOverlary';

const {width} = Dimensions.get('window');

const GIFDetails = () => {
  const route = useRoute<{params: {id: string}}>();
  const {id} = route.params;

  const [isPaused, setIsPaused] = useState(false);
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [currentDownloadOption, setCurrentDownloadOption] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);

  const {theme, isDark} = useTheme();
  const {data: gifData, isLoading, error} = useGifDetails(id);

  useEffect(() => {
    if (gifData) {
      FastImage.preload([{uri: gifData.images.original.url}]);
    }
  }, [gifData]);

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      'Permission Denied',
      'Storage permission is required to download GIFs.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
        {
          text: 'Try Again',
          onPress: () => {
            if (currentDownloadOption) {
              handleDownload(currentDownloadOption);
            }
          },
        },
      ],
    );
  };

  const downloadGifOptions = gifData
    ? Object.entries(gifData.images)
        .map(([key, value]) => ({
          label: key.replace(/_/g, ' '),
          url: value.url,
          type: key.includes('mp4') ? 'mp4' : 'gif',
        }))
        .filter(option => option.url)
    : [];

  const handleDownload = async option => {
    setIsDownloadModalVisible(false);
    setCurrentDownloadOption(option);

    const hasPermission = await requestStoragePermission();

    if (!hasPermission) {
      showPermissionDeniedAlert();
      return;
    }

    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
        appendExt: option.type,
      }).fetch('GET', option.url);

      const savedUri = await CameraRoll.saveAsset(response.path(), {
        type: 'photo',
        album: 'D-GIFs Downloads',
      });

      Toast.show({
        type: 'success',
        text1: 'Download Successful',
        text2: `GIF saved to ${Platform.OS === 'ios' ? 'Photos' : 'Gallery'}`,
        visibilityTime: 3000,
      });

      await response.flush();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Download Failed',
        text2: 'Unable to download GIF. Please try again.',
        visibilityTime: 3000,
      });
    }
  };

  const handleShare = async () => {
    if (!gifData || !gifData.images.original.url) return;

    try {
      setShareLoading(true);

      // Step 1: Download the GIF to local storage
      const fileUrl = gifData.images.original.url;
      const filePath = `${RNFS.CachesDirectoryPath}/temp_gif.gif`;

      // Download the GIF to local path
      const download = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: filePath,
      }).promise;

      // Prepare the share options
      const shareOptions = {
        title: 'Share GIF',
        url:
          Platform.OS === 'ios' ? `file://${filePath}` : `file://${filePath}`,
        type: 'image/gif',
      };

      // Share the downloaded GIF
      await Share.open(shareOptions);

      // Clean up the downloaded file after sharing
      await RNFS.unlink(filePath); // Delete the file to free up storage
    } catch (error) {
      console.error('Sharing Error:', error);
    } finally {
      setShareLoading(false);
    }
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  if (isLoading) return <GifDetailsLoadingSkeleton />;
  if (error || !gifData) {
    if (error) {
      return <ErrorMessage message={error.message} />;
    } else {
      return <ErrorMessage message="No GIF found" />;
    }
  }

  const getGifUrl = () => {
    if (isPaused) {
      return gifData.images.original.url.replace('.gif', '_s.gif');
    }
    return isOriginalLoaded
      ? gifData.images.original.url
      : gifData.images.preview_webp.url;
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <LoadingOverlay isLoading={shareLoading} />
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.gifContainer}>
            <Image
              source={{uri: gifData.images.preview_webp.url}}
              style={[styles.gif, isOriginalLoaded && styles.hidden]}
              resizeMode="contain"
            />
            <FastImage
              source={{uri: getGifUrl()}}
              style={[styles.gif, !isOriginalLoaded && styles.hidden]}
              resizeMode={FastImage.resizeMode.contain}
              onLoad={() => setIsOriginalLoaded(true)}
            />
          </View>
          {gifData.title && (
            <Text
              style={[
                styles.titleText,
                {
                  color: !isDark ? 'black' : 'white',
                },
              ]}>
              {gifData.title}
            </Text>
          )}
          <View style={styles.controlsContainer}>
            <View style={styles.actionRow}>
              <TouchableOpacity
                onPress={togglePlayPause}
                style={styles.controlButton}>
                {!isPaused ? (
                  <Pause size={30} color="black" />
                ) : (
                  <Play size={30} color="black" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsDownloadModalVisible(true)}
                style={styles.controlButton}>
                <Download size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShare}
                style={styles.controlButton}>
                <Share2 size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <DownloadModal
            isVisible={isDownloadModalVisible}
            onClose={() => setIsDownloadModalVisible(false)}
            downloadGifOptions={downloadGifOptions}
            handleDownload={handleDownload}
          />
        </View>
        <Toast />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 20,
    width: width * 0.9,
  },
  gifContainer: {
    width: '100%',
    height: width * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  gif: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  hidden: {
    opacity: 0,
  },
  titleText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  controlsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#E8E8E8',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
});

export default GIFDetails;
