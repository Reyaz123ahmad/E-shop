// Custom hook - Authentication state manage karne ke liye
// Kahan use hota hai: PrivateRoute.jsx, App.jsx, aur kisi bhi component mein jahan auth status chahiye

import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated, selectAuthLoading } from '../slices/authSlice';

const useAuth = () => {
  // Redux se auth state le rahe hain - store/authSlice.js se selectors use ho rahe hain
  const user = useSelector(selectUser);              // Current logged in user data
  const isAuthenticated = useSelector(selectIsAuthenticated);  // User logged in ya nahi
  const loading = useSelector(selectAuthLoading);    // Auth API call chal rahi hai ya nahi
  
  // Return all auth related data
  return {
    user,           // User object: { id, email, name, etc. }
    isAuthenticated, // Boolean: true/false
    loading         // Boolean: true agar API call chal rahi hai
  };
};

export default useAuth;