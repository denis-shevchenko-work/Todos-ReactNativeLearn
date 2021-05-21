import mockAxios from 'axios';
import AxiosInstance from 'axios';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
//import {render, cleanup, fireEvent} from 'react-native-testing-library';
//import * as actions from '../src/store/actions';
//import {USER_LOGIN, GET_TASKS_ALL} from '../src/store/types';
import * as api from '../src/store/api/tasksApi';


//jest.mock('axios');
//const mockAxios = jest.genMockFromModule('axios')

//jest.unmock('../src/store/api/tasksApi');

// The assertion for a promise must be returned.
it('login user action created', async () => {
  const resp = {
    data: {
      user: {
        age: 20,
        _id: '60940c5ec108bc001729d5a4',
        name: 'SomeName',
        email: 'aaa2@bbb.ccc',
        createdAt: '2021-05-06T15:33:50.404Z'
      },
      token: 'test'
    },
    status: 200
  };

  //mockAxios.create.mockResolvedValue(jest.fn(() => mockAxios));
 // axios.create.mockResolvedValue(axios);// new AxiosInstance();
  /*
  {
    post: function () {
      return resp;
    }
  }
  */
  mockAxios.post.mockResolvedValue(resp);
  //AxiosInstance.post.mockResolvedValue(resp);
  // AxiosInstance.post.mockImplementation(() => Promise.resolve(resp))

  let login = await api.userLogin({email: 'aaa2@bbb.ccc', password: 'test'});
  expect(mockAxios.post).toHaveBeenCalledTimes(1)
  expect(login).not.toBeUndefined();
  expect(login.data).not.toBeUndefined();
  expect(login.data.user).not.toBeUndefined();
  expect(login.data.user.name).toMatch('SomeName');

});

