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
  async(creditials, { rejectwithvalue }) => {
    try {
        const data = new URLSearchParams()
        data.append('username', creditials.username)
        data.append('password', creditials.password)

        const response = await axios.post('/auth/login', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })

        return response.data
    } catch (error) {
        return rejectwithvalue(error.message)
    }
})