import React, {useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {shouldUseActivityState} from 'react-native-screens';

const HomeScreen = ({navigation, route}) => {
  const loginData = useSelector(state => state.todoListReducer.loginData);
  console.log("loginData");
  console.log(loginData);
  const user = loginData.data.user;
  return (
    <SafeAreaView>
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate('Profile', {name: user.name})}
      />
      <Button
        title="Go to todo list"
        onPress={() => {
          navigation.navigate('Todos', {name: user.name});
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
