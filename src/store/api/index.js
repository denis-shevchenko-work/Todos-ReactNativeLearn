
import axios from 'axios';

const API_URL =  'https://api-nodejs-todolist.herokuapp.com';
const USER_PATH = `/user`;
const TASK_PATH = `/task`;

const axiosInstance =  axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {'Content-Type': 'application/json'}
});

function responseDecorator(apiCall){
    return function() {
        return apiCall.apply(this, arguments)
        .then(response => response.data)
        .catch(error => console.log(error));
    }
};

export function userRegister(values) {
    return axiosInstance.post(`${USER_PATH}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        age: values.age,
      })
      .catch(error => console.log(error));
}

export function userLogin(values) {
    return axiosInstance.post(`${USER_PATH}/login`, {
        email: values.email,
        password: values.password,
      })
      .catch(error => {
        console.log(error);
        return { error: error };
      });
}


export function getTasks(token) {
  return axiosInstance.get(TASK_PATH, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function markTaskAsDone(id, token) {
  return axiosInstance.put(
    `${TASK_PATH}/${id}`, 
    {
    completed: true,
  }, 
  {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function addTask(description, token) {
  return axiosInstance.post(TASK_PATH,
      {
        description: description,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      },
    ).catch(function (error) {
      console.log(error);
    });

}



