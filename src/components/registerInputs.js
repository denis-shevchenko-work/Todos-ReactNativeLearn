import React from 'react';
import {Input} from 'react-native-elements';

const RegisterInputs = props => {
  const {handleChange, handleBlur, values} = props;
  return (
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
  );
};

export default RegisterInputs;
