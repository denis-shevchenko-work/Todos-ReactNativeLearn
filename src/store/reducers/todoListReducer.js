import {
  GET_TASKS_ALL,
  ADD_TASK,
  MARK_TASK_AS_DONE,
  USER_REGISTER,
  USER_LOGIN,
  SET_AUTHENTICATED,
} from '../types';

const INITIAL_STATE = {
  authenticated: false,
  taskList: {data: {data: []}},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TASKS_ALL:
      return {...state, taskList: extractData(action.payload)};
    case MARK_TASK_AS_DONE:
      return {...state, marked: extractData(action.payload)};
    case ADD_TASK:
      return {...state, added: extractData(action.payload)};
    case USER_LOGIN:
      return {
        ...state,
        loginData: extractData(action.payload),
        //authenticated: action.payload.status==200 && action.payload.data && action.payload.data.token && true
      };
    case SET_AUTHENTICATED:
      return {...state, authenticated: action.payload};
    default:
      return state;
  }
}

function extractData(payload, dataFieldName) {
  dataFieldName = dataFieldName || "data";
  return {
    data: payload[dataFieldName],
    status: payload.status,
  };
}