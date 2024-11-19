import {StyleSheet, Text, View } from 'react-native';
import React from 'react';


const App = () => {
  return (
    <View style={styles.bg}>
      <Text style={{color: "red"}}>App</Text>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "white",
    flex: 1,
  }
});