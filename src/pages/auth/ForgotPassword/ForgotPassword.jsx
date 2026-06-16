
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authStart, authFail, authComplete } from '../../../slices/authSlice';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import AuthLayout from '../../../components/layout/AuthLayout/AuthLayout';
import { authService } from '../../../services/authService';
import { validateEmail } from '../../../utils/validation';
import toast from 'react-hot-toast';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Redux se loading aur error le rahe hain
  const { loading, error: reduxError } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    setEmailError(emailErr || '');
    
    if (emailErr) return;
    
    setMessage('');
    
    // Redux loading true
    dispatch(authStart());

    try {
      await authService.forgotPassword(email);
      
      // Success - loading false
      dispatch(authComplete());
      
      setMessage('Reset link sent to your email! Please check your inbox.');
      toast.success('Reset link sent to your registered email!');
      
      setTimeout(() => {
        navigate('/confirmation', { state: { email } });
      }, 1000);
      
    } catch (err) {
      // Redux error store
      dispatch(authFail(err.response?.data?.message || 'Failed to send reset link'));
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive reset link"
      footerText="Remember your password?"
      footerLink="/login"
      footerLinkText="Back to Login"
    >
      <div className={styles.container}>
        <form onSubmit={handleSendOTP} className={styles.form}>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            placeholder="Enter your registered email"
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </Button>

          {message && <div className={styles.successMessage}>{message}</div>}
          {reduxError && <div className={styles.errorMessage}>{reduxError}</div>}
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;