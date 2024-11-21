import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.centered, {backgroundColor: theme.backgroundColor}]}>
      <Text style={{color: theme.textColor}}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorMessage;
