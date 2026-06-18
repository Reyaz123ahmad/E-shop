


import api from './api';

export const userService = {
  
  // ✅ GET PROFILE
  getProfile: () => {
    return api.get('/user/profile');
  },
  
  // ✅ UPDATE PROFILE - with image upload
  updateProfile: (data) => {
    return api.put('/user/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // ✅ CHANGE PASSWORD
  changePassword: (data) => {
    return api.put('/user/change-password', data);
  },
  
  // ✅ DELETE ACCOUNT
  deleteAccount: () => {
    return api.delete('/user/account');
  }
};