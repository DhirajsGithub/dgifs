import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useFetchTrendingGifs} from '../hooks/useFetchTrendingGifs';

const {width} = Dimensions.get('window');
const ITEM_SPACING = 4;
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - (NUM_COLUMNS + 1) * ITEM_SPACING) / NUM_COLUMNS;

const TrendingScreen: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useFetchTrendingGifs();

  const renderGifItem = ({item}: {item: any}) => (
    <TouchableOpacity style={styles.gifItem}>
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

  const renderFooter = () => {
    if (!hasNextPage) return null;
    return (
      <View style={styles.footer}>
        {isFetchingNextPage && <ActivityIndicator size="large" />}
      </View>
    );
  };

  const loadMoreGifs = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
      </View>
    );
  }

  const flattenedData = data?.pages.flatMap(page => page.data) || [];

  return (
    <FlatList
      data={flattenedData}
      renderItem={renderGifItem}
      keyExtractor={item => item.id}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={styles.container}
      onEndReached={loadMoreGifs}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ITEM_SPACING,
  },
  gifItem: {
    margin: ITEM_SPACING / 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default TrendingScreen;
