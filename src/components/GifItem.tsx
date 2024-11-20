import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const GifItem = ({item, ITEM_SIZE}: {item: any; ITEM_SIZE: number}) => {
  const navigation = useNavigation();
  const handleGigPress = id => {
    navigation.navigate('GIFDetails', {id: item.id, item});
  };
  return (
    <TouchableOpacity onPress={handleGigPress} style={styles.gifItem}>
      <Image
        source={{uri: item.images.fixed_width.url}}
        style={{
          width: ITEM_SIZE,
          height:
            parseInt(item.images.fixed_width.height) *
            (ITEM_SIZE / parseInt(item.images.fixed_width.width)),
        }}
        resizeMode="cover"
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
