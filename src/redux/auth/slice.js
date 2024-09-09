import { createSlice } from '@reduxjs/toolkit';

import { apiRefreshUser, login, register } from './operations';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: localStorage.getItem('token') || null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logOutSuccess: state => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },

  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.pending, state => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(apiRefreshUser.pending, state => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isRefreshing = false;
      })
      .addCase(apiRefreshUser.rejected, state => {
        state.error = true;
        state.isRefreshing = false;
      }),
});
export const authReducer = authSlice.reducer;
