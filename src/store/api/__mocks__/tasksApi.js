import {GET_TASKS_ALL, USER_LOGIN} from "../../../../src/store/types";


export function userLogin(values) {
  return {
    data: {
      user: {
        age: 20,
        _id: '60940c5ec108bc001729d5a4',
        name: 'SomeName',
        email: values.email,
        createdAt: '2021-05-06T15:33:50.404Z',
        updatedAt: '2021-05-20T12:39:54.604Z',
        __v: 156,
      },
      token: 'test',
    },
    status: 200,
  };
};

export function getTasks(token) {
  return {
    data: {
      count: 2,
      data: [
        {
          "completed": false,
          "_id": "6094ff1a5b5238001797b260",
          "description": "reading book",
          "owner": "60940c5ec108bc001729d5a4",
          "createdAt": "2021-05-07T08:49:30.449Z",
          "updatedAt": "2021-05-07T08:49:30.449Z",
          "__v": 0
        },
        {
          "completed": true,
          "_id": "60951f305b5238001797b269",
          "description": "making look",
          "owner": "60940c5ec108bc001729d5a4",
          "createdAt": "2021-05-07T11:06:24.937Z",
          "updatedAt": "2021-05-07T11:13:17.777Z",
          "__v": 0
        },
      ],
    },
    status: 200
  };

}