import React, {useState, useContext} from 'react';

import {Text, View, Button, FlatList, TextInput, SafeAreaView} from 'react-native';
import {shouldUseActivityState} from 'react-native-screens';

import {AppContext} from '../context';


const HomeScreen = ({navigation, route}) => {
  const context = useContext(AppContext);
  return (
    <SafeAreaView>
      <Button
        title="Go to profile"
        onPress={() =>
          navigation.navigate('Profile', {name: context.state.user.name})
        }
      />
      <Button
        title="Go to todo list"
        onPress={() => {
          navigation.navigate('Todos', {name: context.state.user.name});
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;