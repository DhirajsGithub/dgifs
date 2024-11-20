import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TrendingScreen from '../screens/TrendingScreen';
import {useTheme} from '../context/ThemeContext';
import ThemeToggleSwitch from '../components/ThemeToggleButton';
import GIFDetails from '../screens/GIFDetails';

const Stack = createStackNavigator();

const Router = () => {
  const {theme} = useTheme(); 

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Trending"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.headerColor, 
          },
          headerTintColor: theme.textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
        
          name="Trending"
          component={TrendingScreen}
          options={{
            title: 'Trending GIFs',
            headerBackTitle: '',
            headerRight: () => <ThemeToggleSwitch />, 
          }}
        />
        <Stack.Screen
          name="GIFDetails"
          component={GIFDetails}
          options={{
            title: 'GIF Details',
            headerBackTitle: '',
            headerRight: () => <ThemeToggleSwitch />, 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
