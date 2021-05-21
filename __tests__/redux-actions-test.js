import configureMockStore from 'redux-mock-store'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';

import mockAxios from 'axios';
//import {render, cleanup, fireEvent} from 'react-native-testing-library';

import * as actions from '../src/store/actions';
import {USER_LOGIN, GET_TASKS_ALL} from '../src/store/types';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../src/store/api/tasksApi');

describe('async actions', () => {

// The assertion for a promise must be returned.
  test('get task list promise', async () => {
//given
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();// mockStore({ todos: [] })

    const mockData = {
      data: {
        user: {
          age: 20,
          _id: '60940c5ec108bc001729d5a4',
          name: 'SomeName',
          email: 'aaa2@bbb.ccc',
          createdAt: '2021-05-06T15:33:50.404Z',
          updatedAt: '2021-05-20T12:39:54.604Z',
          __v: 156,
        },
        token: 'test',
      },
      status: 200,
    }
    const expectedActions = [
      {type: USER_LOGIN, payload: mockData},
    ]

    //when
    await store.dispatch(actions.loginUser({email: 'aaa2@bbb.ccc', password: 'test'}));

    //then
    // assertions / expects
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalledTimes(0);

  });
});
