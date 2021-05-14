import React, {useState, useContext, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Button,
  TextInput,
  SafeAreaView,
  Text,
  ScrollView

} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {taskListAll, markTaskAsDone, addTask } from '../store/actions';
import Splash from '../components/splash';


const TodosScreen = ({navigation, route}) => {
  const [drawState, setDrawState] = useState({reload: true, dirty: false});
  const reducer = useSelector(state => state.todoListReducer);
  const taskList = reducer.taskList.data.data;
  const token = reducer.loginData.data.token;
  const dispatch = useDispatch();  

  async function done(id) {
    setDrawState({reload: false, dirty: true});
    await dispatch(markTaskAsDone(id, token))
    .catch(function (error) {
      console.log(error);
    });
    setDrawState({reload: true, dirty: false});
  }
  
  async function addItem(description) {
    setDrawState({reload: false, dirty: true});
    console.log(drawState);
    await dispatch(addTask(description, token))
    .catch(function (error) {
        console.log(error);
    });
    setDrawState({reload: true, dirty: false});
  }
  
  async function getItems() {
    await dispatch(taskListAll(token)).catch(error => {
      console.log(error);
    });
    setDrawState({reload: false, dirty: false});
  }

  drawState.reload ? getItems() : null;

  return (
    (drawState.dirty || drawState.reload) ? <Splash /> : (
      <View style={{flex: 1, backgroundColor: 'light-gray'}}>
        <ScrollView style={{flex: 1}}>
          {taskList.map((item, i) => (
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
        </ScrollView>

        <NewTodo onPress={i => addItem(i)} />
      </View>
    )
  );
};

  

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

export default TodosScreen;
