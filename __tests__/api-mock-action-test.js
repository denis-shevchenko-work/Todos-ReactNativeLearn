import axios from 'axios';
import AxiosInstance from 'axios';
import * as actions from '../src/store/actions';
import {USER_LOGIN, GET_TASKS_ALL} from '../src/store/types';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
//import {render, cleanup, fireEvent} from 'react-native-testing-library';

jest.mock('../src/store/api/tasksApi');
//jest.mock('axios');

// The assertion for a promise must be returned.
it('login user action created',  () => {
  /*const resp = {
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
    status: 200};

  AxiosInstance.post.mockResolvedValue(resp);*/
  // AxiosInstance.post.mockImplementation(() => Promise.resolve(resp))
  let login = actions.loginUser({email: 'aaa2@bbb.ccc', password:'test'});
  expect(login.type).toEqual(USER_LOGIN);
  expect(login.payload).not.toBeUndefined();
  expect(login.payload.data).not.toBeUndefined();
  expect(login.payload.data.user).not.toBeUndefined();
  expect(login.payload.data.user.name).toMatch('SomeName');

});


it('task list action created',  () => {
  let tasks = actions.taskListAll('test');
  expect(tasks.type).toEqual(GET_TASKS_ALL);
  expect(tasks.payload).not.toBeUndefined();
  expect(tasks.payload.data).not.toBeUndefined();
  expect(tasks.payload.data.count).toBe(2);
  expect(tasks.payload.data.data.length).toBe(2);
  expect(tasks.payload.data.data[0]).not.toBeUndefined();
  expect(tasks.payload.data.data[0].description).toMatch("reading book");
  expect(tasks.payload.data.data[1]).not.toBeUndefined();
  expect(tasks.payload.data.data[1].description).toMatch("making look");
});
