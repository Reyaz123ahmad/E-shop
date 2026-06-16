// Token save karne ka function
// Kahan call hota hai: Login ya Signup success ke baad store/authSlice.js mein
export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Token lene ka function
// Token lena - with check
export const getToken = () => {
  const token = localStorage.getItem('authToken');
  
  // ✅ Check for "undefined" string
  if (!token || token === 'undefined') {
    return null;
  }
  
  return token;
};

// Token remove karne ka function
// Kahan call hota hai: Logout ke time, 401 error pe
export const removeToken = () => {
  localStorage.removeItem('authToken');
};

// User data save karna (optional)
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};


// User data lena - with error handling
export const getUser = () => {
  const user = localStorage.getItem('user');
  
  // ✅ Check for "undefined" string
  if (!user || user === 'undefined') {
    return null;
  }
  
  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Failed to parse user:", error);
    return null;
  }
};


// Clear all auth data
export const clearAuthData = () => {
  removeToken();
  localStorage.removeItem('user');
};