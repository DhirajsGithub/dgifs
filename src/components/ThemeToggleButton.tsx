import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {lightTheme} from '../theme/themes';

const ThemeToggleSwitch = () => {
  const {theme, toggleTheme} = useTheme();
  const isLightTheme = theme.backgroundColor === lightTheme.backgroundColor;

  return (
    <View style={styles.switchContainer}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isLightTheme ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={!isLightTheme}
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
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Reduce size of the switch
  },
});

export default ThemeToggleSwitch;
