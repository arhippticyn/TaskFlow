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
