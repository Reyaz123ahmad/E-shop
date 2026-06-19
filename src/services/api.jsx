// axios import - HTTP requests ke liye
import axios from 'axios';

// config se base URL le rahe hain
import { API_BASE_URL } from '../config';

// axios instance create kiya
const api = axios.create({
  baseURL: API_BASE_URL,  // .env se aayega
  timeout: 50000,          // 10 second timeout
});

// request interceptor - har request se pehle token attach karega
api.interceptors.request.use(
  (config) => {
    // storage.js se token le rahe hain
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor - har response ke baad
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired - logout kar do
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;