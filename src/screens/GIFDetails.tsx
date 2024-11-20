import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {useGifDetails} from '../hooks/useGifDetails';
import FastImage from 'react-native-fast-image';
import {Play, Pause, Download, Share2} from 'lucide-react-native';
import GifDetailsLoadingSkeleton from '../components/GifDetailsLoadingSkeleton';
import {useTheme} from '../context/ThemeContext';

const {width} = Dimensions.get('window');

const GIFDetails = () => {
  const route = useRoute<{params: {id: string}}>();
  const {id} = route.params;
  const [isPaused, setIsPaused] = useState(false);
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);
  const {theme} = useTheme();

  const {data: gifData, isLoading, error} = useGifDetails(id);

  // Preload original GIF
  useEffect(() => {
    if (gifData) {
      FastImage.preload([{uri: gifData.images.original.url}]);
    }
  }, [gifData]);

  const handleDownload = async () => {
    if (!gifData) return;

    const url = gifData.images.original.url;
    const filename = `gif_${Date.now()}.gif`;
    const path = `${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      const result = await RNFS.downloadFile({fromUrl: url, toFile: path})
        .promise;

      if (result.statusCode === 200) {
        Platform.OS === 'android'
          ? ToastAndroid.show('GIF Downloaded', ToastAndroid.SHORT)
          : Alert.alert('Downloaded', 'GIF saved successfully');
      }
    } catch (downloadError) {
      console.error('Download Error:', downloadError);
      Alert.alert('Download Failed', 'Unable to download GIF');
    }
  };

  const handleShare = async () => {
    if (!gifData) return;

    const shareOptions = {
      title: 'Share GIF',
      url: gifData.images.original.url,
    };

    try {
      await Share.open(shareOptions);
    } catch (sharingError) {
      console.error('Sharing Error:', sharingError);
    }
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  if (isLoading) return <GifDetailsLoadingSkeleton />;
  if (error) return null;
  if (!gifData) return null;

  const getGifUrl = () => {
    if (isPaused) {
      return gifData.images.original.url.replace('.gif', '_s.gif');
    }
    return isOriginalLoaded
      ? gifData.images.original.url
      : gifData.images.preview_gif.url;
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.contentContainer}>
        <View style={styles.gifContainer}>
          {/* Preview GIF */}
          <FastImage
            source={{uri: gifData.images.preview_gif.url}}
            style={[styles.gif, isOriginalLoaded && styles.hidden]}
            resizeMode={FastImage.resizeMode.contain}
          />

          {/* Original GIF */}
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
                color: theme.backgroundColor === '#ffffff' ? 'black' : 'white',
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
              onPress={handleDownload}
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
      </View>
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
