import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const SetAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const RegisterUser = createAsyncThunk(
  'auth/RegisterUser',
  async (user, { rejectwithvalue }) => {
    try {
      const response = await axios.post('/auth/register', user);

      return response.data;
    } catch (error) {
      return rejectwithvalue(error.message);
    }
  }
);

export const LoginUser = createAsyncThunk(
  'auth/LoginUser',
  async (creditials, { rejectwithvalue }) => {
    try {
      const data = new URLSearchParams();
      data.append('username', creditials.username);
      data.append('password', creditials.password);

      const response = await axios.post('/auth/login', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      SetAuthHeader(response.data.access_token);

      return response.data;
    } catch (error) {
      return rejectwithvalue(error.message);
    }
  }
);

export const GetUser = createAsyncThunk(
  'auth/GetUser',
  async (_, { rejectwithvalue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) return rejectwithvalue('Error with token');

      SetAuthHeader(token);

      const response = await axios.get('/users/me');

      return response.data;
    } catch (error) {
      return rejectwithvalue(error.message);
    }
  }
);

export const AddTasks = createAsyncThunk(
  'tasks/AddTasks',
  async (task_new, { rejectwithvalue }) => {
    try {
      const response = await axios.post('/tasks', task_new);

      return response.data;
    } catch (error) {
      return rejectwithvalue(error.message);
    }
  }
);

export const GetTasks = createAsyncThunk(
  'tasks/GetTasks',
  async (_, { rejectwithvalue }) => {
    try {
      const response = await axios.get('/task');

      return response.data;
    } catch (error) {
      return rejectwithvalue(error.message);
    }
  }
);


export const PutTask = createAsyncThunk('tasks/PutTask', async ({id, title_new, description_new}, {rejectwithvalue}) => {
  try {
    const response = await axios.put(`/taskput/${id}`, {
      title_new,
      description_new
    })

    return response.data
  } catch (error) {
    return rejectwithvalue(error.message)
  }
});

export const DeleteTask = createAsyncThunk('tasks/DeleteTask', async ({id}, {rejectwithvalue}) => {
  try {
    const response = await axios.delete(`deletetask/${id}`);

    return response.data
  } catch(error) {
    return rejectwithvalue(error.message)
  }
});