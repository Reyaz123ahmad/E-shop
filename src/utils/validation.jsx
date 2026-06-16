// Email validation function
// Kahan use hota hai: Login, Signup, ForgotPassword - sabme
export const validateEmail = (email) => {
  // Regex se email format check
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!regex.test(email)) return 'Invalid email format';
  return null; // null means no error
};

// Password validation
// Kahan use hota hai: Login.jsx aur Signup.jsx
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

// Confirm password validation
// Kahan use hota hai: Sirf Signup.jsx mein
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

// OTP validation
// Kahan use hota hai: Signup.jsx mein
export const validateOTP = (otp) => {
  if (!otp) return 'OTP is required';
  if (otp.length !== 6) return 'OTP must be 6 digits';
  if (!/^\d+$/.test(otp)) return 'OTP must contain only numbers';
  return null;
};