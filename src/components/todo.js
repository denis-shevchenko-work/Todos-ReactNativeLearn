import React, {useState, useContext, useEffect} from 'react';

import {
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {shouldUseActivityState} from 'react-native-screens';

import {AppContext} from '../context';
import axios from 'axios';

const TodosDataSource = () => {
  const url = '';

}


const TodosScreen = ({navigation, route}) => {
  const [dirty,setDirty] = useState(true);
  const context = useContext(AppContext);
  const state = context.state;
  const token = state.token;

  const USER_API_URL = 'https://api-nodejs-todolist.herokuapp.com/';
  const instance = axios.create({
    baseURL: USER_API_URL,
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
  });


  function NewTodo(props) {
    const [inputValue, setInputValue] = useState('');

    return (
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={{flex: 1, backgroundColor: 'white', borderColor: 'gray'}}
          value={inputValue}
          onChangeText={e => setInputValue(e)}
        />
        <Button
          style={{flex: 1}}
          title="Add"
          onPress={e => {
            props.onPress(inputValue);
            setInputValue('');
          }}
        />
      </View>
    );
  }

  function TodoList(props) {
    
    async function done(id) {
      await instance.put(`task/${id}`,
          {
            completed: true,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          },
        ).then(response => {
          setDirty(true);
        }).catch(function (error) {
          console.log(error);
        });
    }

    async function addItem(item) {
      await instance.post('task',
          {
            description: item,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          },
        ).then(response => {
          setDirty(true);
        }).catch(function (error) {
          console.log(error);
        });

    }

    async function getItems() {
      await instance.get('task', {
        headers: {
          'Authorization': 'Bearer ' + token, 
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        setDirty(false);
        context.updateState((prev, props) => ({
          items: response.data.data,
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    dirty ? getItems() : null;
    console.log(state.items);

    return (
      <View style={{flex: 1, backgroundColor: 'light-gray'}}>
        <View style={{flex: 1}}>
          {state.items.map((item, i) => (
            <ListItem key={item._id} bottomDivider>
              <ListItem.Chevron />
              <ListItem.Content>
                <ListItem.Title>{item.description}</ListItem.Title>
              </ListItem.Content>
              {item.completed ? (
                <Icon name="checkmark"></Icon>
              ) : (
                <Button
                  title="dust jo it!"
                  disabled={item.completed}
                  onPress={e => done(item._id)}
                />
              )}
            </ListItem>
          ))}
        </View>

        <NewTodo onPress={i => addItem(i)} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TodoList />
    </SafeAreaView>
  );
};

export default TodosScreen;
