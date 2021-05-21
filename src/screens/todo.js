import React, {useState, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Button,
  TextInput,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {taskListAll, markTaskAsDone, addTask} from '../store/actions';
import Splash from '../components/splash';

const TodosScreen = ({navigation, route}) => {
  const [screenState, setDrawState] = useState({reloadList: true, showSplash: true});
  const reducer = useSelector(state => state.todoListReducer);
  const taskList = reducer.taskList.data.data;
  const token = reducer.loginData.data.token;
  const dispatch = useDispatch();

  useEffect(() => {
    screenState.reloadList && getItems();
  }, [screenState.reloadList]);

  async function done(id) {
    setDrawState({reloadList: false, showSplash: true});
    dispatch(markTaskAsDone(id, token))
    .then(async () => {
      setDrawState({reloadList: true, showSplash: false});
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  async function addItem(description) {
    setDrawState({reloadList: false, showSplash: true});
    await dispatch(addTask(description, token)).catch(function (error) {
      console.log(error);
    });
    setDrawState({reloadList: true, showSplash: false});
  }

  async function getItems() {
    await dispatch(taskListAll(token)).catch(error => {
      console.log(error);
    });
    setDrawState({reloadList: false, showSplash: false});
  }

  return screenState.showSplash ? (
    <Splash />
  ) : (
    <View style={{flex: 1, backgroundColor: 'light-gray'}}>
      <ScrollView style={{flex: 1}}>
        {taskList.map((item, i) => (
          <ListItem key={item._id} bottomDivider>
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>{item.description}</ListItem.Title>
            </ListItem.Content>
            {item.completed ? (
              <Icon name="checkmark" />
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
