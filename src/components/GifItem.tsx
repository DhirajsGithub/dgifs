import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const GifItem = ({item, ITEM_SIZE}: {item: any; ITEM_SIZE: number}) => {
  const navigation = useNavigation();
  const handleGigPress = () => {
    navigation.navigate('GIFDetails', {id: item.id});
  };
  return (
    <TouchableOpacity onPress={handleGigPress} style={styles.gifItem}>
      <FastImage
        source={{uri: item.images.preview_gif.url}}
        style={{
          width: ITEM_SIZE,
          height:
            parseInt(item.images.fixed_width.height) *
            (ITEM_SIZE / parseInt(item.images.fixed_width.width)),
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gifItem: {
    margin: 4,
  },
});

export default GifItem;
