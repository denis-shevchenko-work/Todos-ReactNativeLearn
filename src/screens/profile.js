import React, {useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Text, View, } from 'react-native';
import {ListItem} from 'react-native-elements';


const ProfileScreen = ({navigation, route}) => {
  const loginData = useSelector(state => state.todoListReducer.loginData);
  const user = loginData.data.user;
  
  let fields = Object.entries(user)
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