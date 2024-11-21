import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const LoadingOverlay = ({isLoading}: {isLoading: boolean}) => {
  const {theme} = useTheme();

  if (!isLoading) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}>
      <ActivityIndicator size="large" color={theme.textColor} />
    </View>
  );
};

export default LoadingOverlay;
