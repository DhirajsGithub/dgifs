import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useFetchTrendingGifs} from '../hooks/useFetchTrendingGifs';
import {useSearchGifs} from '../hooks/useSearchGifs';
import {useTheme} from '../context/ThemeContext';
import SkeletonLoader from '../components/SkeletonLoader';
import GifItem from '../components/GifItem';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';

const {width} = Dimensions.get('window');
const ITEM_SPACING = 4;
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - (NUM_COLUMNS + 1) * ITEM_SPACING) / NUM_COLUMNS;

const TrendingScreen: React.FC = () => {
  const {theme} = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const trendingGifs = useFetchTrendingGifs();
  const searchGifs = useSearchGifs(searchQuery);

  const isSearching = !!searchQuery;

  const {
    data: trendingData,
    fetchNextPage: fetchNextTrendingPage,
    hasNextPage: hasNextTrendingPage,
    isLoading: isLoadingTrending,
    isFetchingNextPage: isFetchingNextTrendingPage,
  } = trendingGifs;

  const {
    data: searchData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isLoading: isLoadingSearch,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = searchGifs;

  const renderGifItem = ({item}: {item: any}) => (
    <GifItem item={item} ITEM_SIZE={ITEM_SIZE} />
  );

  const renderFooter = () => <SkeletonLoader />;

  const flattenedData = isSearching
    ? searchData?.pages.flatMap(page => page.data) || []
    : trendingData?.pages.flatMap(page => page.data) || [];

  const handleEndReached = () => {
    if (isSearching) {
      if (hasNextSearchPage && !isFetchingNextSearchPage) fetchNextSearchPage();
    } else {
      if (hasNextTrendingPage && !isFetchingNextTrendingPage)
        fetchNextTrendingPage();
    }
  };

  const renderContent = () => {
    if (isLoadingTrending || (isSearching && isLoadingSearch)) {
      return (
        <View
          style={[styles.centered, {backgroundColor: theme.backgroundColor}]}>
          <SkeletonLoader />
        </View>
      );
    }

    if (flattenedData.length === 0) {
      return (
        <ErrorMessage
          message={isSearching ? 'No GIFs found' : 'No trending GIFs found'}
        />
      );
    }

    return (
      <FlatList
        data={flattenedData}
        renderItem={renderGifItem}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={[
          styles.container,
          {backgroundColor: theme.backgroundColor},
        ]}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    );
  };

  return (
    <>
      <StatusBar backgroundColor={theme.headerColor} />
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <SearchBar onSearch={setSearchQuery} />
        {renderContent()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: ITEM_SPACING,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrendingScreen;
