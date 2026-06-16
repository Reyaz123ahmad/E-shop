
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateOTP, validatePassword, validateConfirmPassword } from '../../../utils/validation';
// Components
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import OTPInput from '../../../components/common/OTPInput/OTPInput';
import AuthLayout from '../../../components/layout/AuthLayout/AuthLayout';
// Redux actions
import { authStart, authFail, authComplete } from '../../../slices/authSlice';
// Services
import { authService } from '../../../services/authService';

const Signup = () => {
  // Form state
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // OTP generation state - kya OTP bhej diya?
  const [otpSent, setOtpSent] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  
  // Error states
  const [nameError, setNameError] = useState('');  
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Step 1: Send OTP - With Redux loading
  const handleSendOTP = async () => {
    const emailErr = validateEmail(email);
    setEmailError(emailErr || '');
    
    if (emailErr) return;
    
    // Start loading
    dispatch(authStart());
    
    try {
      await authService.generateOTP(email);
      
      // Success - loading false
      dispatch(authComplete());
      
      setOtpSent(true);
      
    } catch (err) {
      // Error - loading false
      dispatch(authFail(err.response?.data?.message || 'Failed to send OTP'));
      setEmailError(err.response?.data?.message || 'Failed to send OTP');
    }
  };
  
  // Step 2: Signup - OTP verify + account create
  const handleSignup = async (e) => {
    e.preventDefault();
    
    const nameErr = name ? '' : 'Name is required';  
    const emailErr = validateEmail(email);
    const roleErr = role ? '' : 'Role is required';
    const otpErr = validateOTP(otp);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(password, confirmPassword);
    
    setNameError(nameErr || '');  
    setEmailError(emailErr || '');
    setRoleError(roleErr || '');
    setOtpError(otpErr || '');
    setPasswordError(passwordErr || '');
    setConfirmPasswordError(confirmPasswordErr || '');
    
    if (nameErr || emailErr || roleErr || otpErr || passwordErr || confirmPasswordErr) return;  
    
    try {
      dispatch(authStart());
      
      await authService.signup(name, role, email, otp, password, confirmPassword);  
      
      dispatch(authComplete());
      navigate('/login');
      
    } catch (err) {
      dispatch(authFail(err.response?.data?.message || 'Signup failed'));
    }
  };
  
  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Create your account"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    >
      <form onSubmit={handleSignup}>
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          placeholder="Enter your email"
          required
        />
        
        {!otpSent ? (
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={handleSendOTP}
            loading={loading}  // Now loading will show spinner
            style={{ marginBottom: '20px' }}
          >
            Send OTP
          </Button>
        ) : (
          <>
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              placeholder="Enter your full name"
              required
            />
            
            <Input
              label="Role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              error={roleError}
              placeholder="Enter your role"
              required
            />
            
            <OTPInput
              value={otp}
              onChange={setOtp}
              error={otpError}
              length={6}
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              placeholder="Create password"
              required
            />
            
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              placeholder="Confirm password"
              required
            />
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </>
        )}
      </form>
    </AuthLayout>
  );
};

export default Signup;