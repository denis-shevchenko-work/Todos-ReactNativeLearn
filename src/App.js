/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodosScreen from './screens/todo';
import AuthenticateScreen from './screens/authenticate';
import ProfileScreen from './screens/profile';
import HomeScreen from './screens/home';
import RNBootSplash from 'react-native-bootsplash';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import {AppContext} from './context/index';

type OwnProps = {|
  passthrough: number,
  todoListReducer: any
|};

type Props = {|
  ...OwnProps,
  todoListReducer: any
|};

type State = {todoListReducer: any};


const Stack = createStackNavigator();

const  App = (props:Props) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {props.todoListReducer.authenticated ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              options={{title: 'Welcome'}}
              component={HomeScreen}
            />
            <Stack.Screen
              name="Profile"
              options={{title: 'Profile'}}
              component={ProfileScreen}
            />
            <Stack.Screen
              name="Todos"
              options={{title: 'Todo List'}}
              component={TodosScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <AuthenticateScreen />
      )}
    </SafeAreaView>
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

function mapStateToProps(state: State) {
  return {
    todoListReducer: state.todoListReducer,
  };
}

export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(App)/* (:?any) */;