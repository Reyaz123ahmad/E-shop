// Custom hook - ForgotPassword page validation

const useForgotPassword = () => {
  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!regex.test(email)) return 'Invalid email format';
    return null;
  };
  
  return { validateEmail };
};

export default useForgotPassword;