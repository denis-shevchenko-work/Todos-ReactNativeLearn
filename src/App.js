/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect, useContext} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodosScreen from './components/todo';
import LoginScreen from './components/login';
import ProfileScreen from './components/profile';
import HomeScreen from './components/home';
import RNBootSplash from 'react-native-bootsplash';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import {AppContext} from './context/index';

const Stack = createStackNavigator();

const App: () => Node = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const context = useContext(AppContext);

  return (
      context.state.token ? 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{title: 'Welcome'}} component={HomeScreen} />
          <Stack.Screen name="Profile" options={{title: 'Todo List'}} component={ProfileScreen} />
          <Stack.Screen name="Todos" options={{title: 'Todo List'}} component={TodosScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      : <LoginScreen />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
