import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useTheme } from '../context/ThemeContext';

const SkeletonLoader = () => {
  const { theme } = useTheme();

  const renderItem = () => (
    <ContentLoader
      speed={1}
      width="50%"
      height={100}
      viewBox="0 0 400 200"
      backgroundColor={theme.backgroundColor === '#ffffff' ? '#e0e0e0' : '#333333'}
      foregroundColor={theme.backgroundColor === '#ffffff' ? '#f4f4f4' : '#555555'}
    >
      <Rect x="10" y="10" rx="4" ry="4" width="100%" height="150" />
      <Rect x="10" y="170" rx="4" ry="4" width="100%" height="20" />
    </ContentLoader>
  );

  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}  // Dummy data to render multiple loaders
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      numColumns={2}  // Two columns in portrait mode (default)
      contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}
      columnWrapperStyle={styles.columnWrapper} // Space between columns
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Space between the columns
    
  },
});

export default SkeletonLoader;
