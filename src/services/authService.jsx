// api.js se axios instance import kiya
import api from './api';

// Auth service object - saare auth related API calls yahan
export const authService = {
  
  // 1. LOGIN API - email + password se login
  // Call kahan hota hai: Login.jsx mein useLogin hook se
  login: (email, password) => {
    return api.post('/user/login', { email, password });
  },
  
  // 2. SIGNUP API - email + otp + password + confirm password
  // Call kahan hota hai: Signup.jsx mein useSignup hook se
  signup: (name, role, email, otp, password, confirmPassword) => {
    return api.post('/user/signup', { 
      name,
      role,
      email, 
      otp, 
      password, 
      confirmPassword 
    });
  },
  
  // 3. GENERATE OTP API - sirf email se OTP generate
  // Call kahan hota hai: ForgotPassword.jsx mein useForgotPassword hook se
  generateOTP: (email) => {
    return api.post('/user/send-otp', { email });
  },
  
  // 4. LOGOUT - token remove karna
  logout: () => {
    return api.post('/user/logout');
  },

  changePassword: (password, newPassword, confirmNewPassword) => {
    return api.post('/user/change-password', {
      password,
      newPassword,
      confirmNewPassword
    });
  },


  forgotPassword: (email) => {
    return api.post('/user/forgot-password', {
      email
    });
  },

  resetPassword: (token, newPassword, confirmNewPassword) => {
    return api.post(`/user/reset-password/${token}`, {
     
      newPassword,
      confirmNewPassword
    });
  }

  
};