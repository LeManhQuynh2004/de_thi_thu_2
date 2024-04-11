import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import HomeScreen from './src/screen/HomeScreen';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
