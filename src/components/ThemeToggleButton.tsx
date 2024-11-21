import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const ThemeToggleSwitch = () => {
  const {toggleTheme, isDark} = useTheme();

  return (
    <View style={styles.switchContainer}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={!isDark ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDark}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
});

export default ThemeToggleSwitch;
