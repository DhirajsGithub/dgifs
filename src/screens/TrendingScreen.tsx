import React, { useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFetchTrendingGifs } from '../hooks/useFetchTrendingGifs';
import { useTheme } from '../context/ThemeContext';
import SkeletonLoader from '../components/SkeletonLoader';
import GifItem from '../components/TrendigGifsComponents/GifItem';
import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get('window');
const ITEM_SPACING = 4;
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - (NUM_COLUMNS + 1) * ITEM_SPACING) / NUM_COLUMNS;

const TrendingScreen: React.FC = () => {
  const { theme } = useTheme();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useFetchTrendingGifs();

  useEffect(() => {
    Orientation.lockToPortrait();

  });

  const renderGifItem = ({ item }: { item: any }) => <GifItem item={item} ITEM_SIZE={ITEM_SIZE} />;

  const renderFooter = () => <SkeletonLoader />;

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.backgroundColor }]}>
        <SkeletonLoader />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.backgroundColor }]}>
        <Text style={{ color: theme.textColor }}>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
      </View>
    );
  }

  const flattenedData = data?.pages.flatMap((page) => page.data) || [];

  return (
    <FlatList
      data={flattenedData}
      renderItem={renderGifItem}
      keyExtractor={(item) => item.id}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ITEM_SPACING,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrendingScreen;
