import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const instance = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      console.error('Register error:', error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    await instance.post('/users/logout');
    setAuthHeader('');

    return;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const apiRefreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthHeader(token);
      const { data } = await instance.get('/users/current');
      console.log('Refresh data:', data);
      return data;
    } catch (error) {
      console.error('Refresh error:', error);
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);
