import React, {useState, useContext} from 'react';

import {
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {ListItem, Input, Button, CheckBox, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import axios from 'axios';

import {AppContext} from '../context';

const LoginScreen = ({navigation, route}) => {
  const context = useContext(AppContext);
  const [register,setRegister] = useState(0);
  const USER_API_URL = 'https://api-nodejs-todolist.herokuapp.com/user/';
  const instance = axios.create({
    baseURL: 'https://api-nodejs-todolist.herokuapp.com/user/',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
  });

  const handleSubmit = async(values) => {
    console.log(values);
    try {
        if (register == 1) {
            let {email, password, name, age} = values;
            let res = await instance
              .post('register', {
                data: {
                  name: name,
                  email: email,
                  password: password,
                  age: age,
                },
              })
              .catch(function (error) {
                console.log(error);
              });
            console.log(res);
            context.updateState((prev, props) => ({
              error: error,
            }));

        } else {
          let {email,password} = values;
          instance.post('login', {
            email: email,
            password: password
          })
          .then((response) => {
            if (response.status == 200) {
              context.updateState((prev, props) => ({
                user: response.data.user,
                token: response.data.token
              }));
            }
          }
          )
          .catch(function (error) {
            console.log(error);
            context.updateState((prev, props) => ({
              error: error,
            }));
          });


        }

    } catch(error) {
        console.log(error);
    }
   
  }

  const switchButtons = (selectedIndex) => {
      setRegister(selectedIndex);
  }

  return (
    <SafeAreaView>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleSubmit(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{padding: '10%'}}>
            <ButtonGroup
              onPress={switchButtons}
              selectedIndex={register}
              buttons={['Login', 'Register']}
            />
            {register ? (
              <>
                <Input
                  placeholder="Enter your name"
                  leftIcon={{type: 'MaterialIcons', name: 'text-fields'}}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <Input
                  placeholder="Enter your age"
                  leftIcon={{type: 'MaterialIcons', name: 'text-fields'}}
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                />
                <Input
                  placeholder="Enter your email"
                  leftIcon={{type: 'MaterialIcons', name: 'email'}}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <Input
                  placeholder="Enter your password"
                  leftIcon={{type: 'MaterialIcons', name: 'fingerprint'}}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </>
            ) : (
              <>
                <Input
                  placeholder="Enter your email"
                  leftIcon={{type: 'MaterialIcons', name: 'email'}}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <Input
                  placeholder="Enter your password"
                  leftIcon={{type: 'MaterialIcons', name: 'fingerprint'}}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                />
              </>
            )}

            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;
