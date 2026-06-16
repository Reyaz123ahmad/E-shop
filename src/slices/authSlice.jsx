// Redux Toolkit se createSlice import kiya
import { createSlice } from '@reduxjs/toolkit';
import { getToken, getUser, clearAuthData, setToken, setUser } from '../utils/storage';

// Initial state - localStorage se data le rahe hain
const initialState = {
  user: getUser(),        // storage.js se aaya
  token: getToken(),      // storage.js se aaya
  isAuthenticated: !!getToken(),  // agar token hai to true
  loading: false,
  error: null
};

// Auth slice banaya
const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    // Login/Signup start - loading true
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Login/Signup success - user aur token save
    // Kahan se aata hai data: Login.jsx ya Signup.jsx se
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;      // backend se aaya
      state.token = action.payload.token;    // backend se aaya
      state.isAuthenticated = true;
      // storage.js function call
      setToken(action.payload.token);
      setUser(action.payload.user);
    },
    
    // Login/Signup fail - error show
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;  // backend se error message aaya
    },

    authComplete: (state) => {
      state.loading = false;
      state.error = null;
    },
    
    // Logout - sab clear
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // storage.js function call
      clearAuthData();
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Actions export
export const { authStart, authSuccess, authFail, logout, clearError, authComplete } = authSlice.actions;

// Selectors - components mein state access karne ke liye
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Reducer export - store.js mein use hoga
export default authSlice.reducer;