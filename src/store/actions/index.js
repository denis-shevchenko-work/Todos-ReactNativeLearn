import {
    GET_TASKS_ALL,
    ADD_TASK,
    MARK_TASK_AS_DONE,
    USER_REGISTER,
    USER_LOGIN,
    SET_AUTHENTICATED,
} from '../types';

import * as api from '../api';

export function registerUser(values) {
  return {
    type: USER_REGISTER,
    payload: api.userRegister(values),
  };
}

export const loginUser = (values) => {
  return {
    type: USER_LOGIN,
    payload: api.userLogin(values),
  };
}

export function setAuthenticated(value) {
  return {
    type: SET_AUTHENTICATED,
    payload: value,
  };
}

export function taskListAll(token) {
  return {
    type: GET_TASKS_ALL,
    payload: api.getTasks(token),
  };
}

export function markTaskAsDone(id, token) {
  return {
    type: MARK_TASK_AS_DONE,
    payload: api.markTaskAsDone(id, token),
  };
}

export function addTask(description, token) {
  return {
    type: ADD_TASK,
    payload: api.addTask(description, token),
  };
}

