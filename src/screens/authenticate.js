import React, {useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {Input, Button, ButtonGroup} from 'react-native-elements';
import {Formik} from 'formik';


import {loginUser, registerUser, setAuthenticated} from '../store/actions';
import Splash from '../components/splash';
import LoginInputs from "../components/loginInputs";
import RegisterInputs from "../components/registerInputs";

const AuthenticateScreen = () => {
  const [register, setRegister] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //const error = useSelector(state => state.auth.error );

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (register == 1) {
        await dispatch(registerUser(values));
        setLoading(false);
      } else {
        let response = await dispatch(loginUser(values));
          /*.then((action) => {
            let payload = action.payload;
            let authenticated = payload.status == 200 && payload.data && payload.data.token && true;
            dispatch(setAuthenticated(authenticated));
            setLoading(false);
            return answer;
          });*/
        let payload = response.payload;
        let authenticated = payload.status == 200 && payload.data && payload.data.token && true;
        await dispatch(setAuthenticated(authenticated));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const switchButtons = (selectedIndex) => {
    setRegister(selectedIndex);
  }

  return (
    <View style={{flex: 1}}>
      {loading ? <Splash/> :
        <Formik initialValues={{email: 'Aaa2@bbb.ccc', password: '1234567'}}
                onSubmit={values => handleSubmit(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={{padding: '10%'}}>
              <ButtonGroup
                onPress={switchButtons}
                selectedIndex={register}
                buttons={['Login', 'Register']}
              />
              {register ? (
                <RegisterInputs handleChange={handleChange} handleBlur={handleBlur} values={values} />
              ) : (
                <LoginInputs handleChange={handleChange} handleBlur={handleBlur} values={values} />
              )}
              <Button title="Submit" onPress={handleSubmit}/>
            </View>
          )}
        </Formik>}
    </View>
  );
};

export default AuthenticateScreen;
