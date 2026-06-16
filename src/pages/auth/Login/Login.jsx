
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { useState } from 'react';
// Components
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import AuthLayout from '../../../components/layout/AuthLayout/AuthLayout';
// Redux actions - authSuccess, authStart, authFail yeh slices/authSlice.js se aayenge
import { authStart, authSuccess, authFail } from '../../../slices/authSlice';
import { authService } from '../../../services/authService';
const Login = () => {
  // Local state - form fields ke liye
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Redux dispatch - actions call karne ke liye
  const dispatch = useDispatch();
  // Navigation - page change karne ke liye
  const navigate = useNavigate();
  // Redux state - loading aur error ke liye
  const { loading, error } = useSelector((state) => state.auth);
  
  // Form validation - local errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Submit handler - form submit hone par call hoga
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation - utils/validation.js se functions call ho rahe hain
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    setEmailError(emailErr || '');
    setPasswordError(passwordErr || '');
    
    // Agar koi error hai to API call mat karo
    if (emailErr || passwordErr) return;
    
    try {
      // Loading start - Redux state update
      dispatch(authStart());
      
      // API call - services/authService.js se login function call ho raha hai
      const response = await authService.login(email, password);
      console.log("Response data:", response.data);
      // Success - Redux state update with user and token
      dispatch(authSuccess({
        user: response.data.data,
        token: response.data.token
      }));
      
      // Dashboard pe redirect
      navigate('/dashboard');
      
    } catch (err) {
      // Error - Redux state update with error message
      dispatch(authFail(err.response?.data?.message || 'Login failed'));
    }
  };
  
  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back! Please login to your account"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign up"
    >
      <form onSubmit={handleSubmit}>
        {/* Email input - validation.js se error aayegi */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          placeholder="Enter your email"
          required
        />
        
        {/* Password input */}
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          placeholder="Enter your password"
          required
        />
        
        {/* Forgot password link */}
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <a href="/forgot-password" style={{ color: '#2563eb', fontSize: '14px' }}>
            Forgot Password?
          </a>
        </div>
        
        {/* Submit button - loading state mein disabled hoga */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        
        {/* Error message - API se aayega */}
        {error && (
          <div style={{ color: '#dc2626', textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default Login;