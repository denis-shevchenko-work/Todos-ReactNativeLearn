import React from 'react';
import {Input, Text} from 'react-native-elements';

const LoginInputs = (props) => {
    const {handleChange, handleBlur, values} = props;
    return (
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
    );
}

export default LoginInputs;