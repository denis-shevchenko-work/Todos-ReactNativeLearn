import React, {useState, useContext} from 'react';

import {
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {shouldUseActivityState} from 'react-native-screens';

import {AppContext} from '../context';

const ProfileScreen = ({navigation, route}) => {
  const context = useContext(AppContext);
  const user =context.state.user;
  
  let fields = Object.entries(context.state.user)
      .filter((item) => item[0] != 'items');

  return (
    <View style={{flex:1}} >
      {fields.map((item, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Chevron />
          <ListItem.Content>
                <ListItem.Title>{item[0]}</ListItem.Title>
          </ListItem.Content>
          <Text>{item[1]}</Text>
        </ListItem>
      ))}
    </View>
  );
};


export default ProfileScreen;