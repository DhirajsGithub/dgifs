import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTheme} from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../theme/themes';

const SkeletonLoader = () => {
  const {theme, isDark} = useTheme();

  const renderItem = () => (
    <ContentLoader
      speed={1}
      width="50%"
      height={100}
      viewBox="0 0 400 200"
      backgroundColor={isDark ? lightTheme.skeletonBg : darkTheme.skeletonBg}
      foregroundColor={isDark ? lightTheme.skeletonFg : darkTheme.skeletonFg}>
      <Rect x="10" y="10" rx="4" ry="4" width="100%" height="200" />
    </ContentLoader>
  );

  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7]}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
      numColumns={2}
      contentContainerStyle={[
        styles.container,
        {backgroundColor: theme.backgroundColor},
      ]}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default SkeletonLoader;
