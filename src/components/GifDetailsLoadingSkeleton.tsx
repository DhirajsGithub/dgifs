import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {useTheme} from '../context/ThemeContext';
import {Dimensions, StyleSheet, View} from 'react-native';
import { darkTheme, lightTheme } from '../theme/themes';

const {width} = Dimensions.get('window');

const GifDetailsLoadingSkeleton = () => {
  const {isDark, theme} = useTheme();
  const circleRadius = 30;
  const circleSpacing = 20;
  const rectWidth = width - 100;
  const rectHeight = 10;

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ContentLoader
        speed={1}
        width={width * 0.9}
        height={width * 0.9 + 150}
        viewBox={`0 0 ${width * 0.9} ${width * 0.9 + 150}`}
        backgroundColor={isDark ? lightTheme.skeletonBg : darkTheme.skeletonBg}
        foregroundColor={isDark ? lightTheme.skeletonFg : darkTheme.skeletonFg}>
        <Rect x="0" y="0" rx="20" ry="20" width="100%" height={width * 0.9} />

        <Rect
          x={(width * 0.9 - rectWidth) / 2}
          y={width * 0.9 + 20}
          rx="4"
          ry="4"
          width={rectWidth}
          height={rectHeight}
        />

        <Circle
          cx={(width * 0.9) / 2 - circleRadius * 2 - circleSpacing}
          cy={width * 0.9 + 100}
          r={circleRadius}
        />
        <Circle
          cx={(width * 0.9) / 2}
          cy={width * 0.9 + 100}
          r={circleRadius}
        />
        <Circle
          cx={(width * 0.9) / 2 + circleRadius * 2 + circleSpacing}
          cy={width * 0.9 + 100}
          r={circleRadius}
        />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default GifDetailsLoadingSkeleton;
