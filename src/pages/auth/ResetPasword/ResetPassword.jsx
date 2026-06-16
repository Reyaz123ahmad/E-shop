
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authStart, authFail, authComplete } from '../../../slices/authSlice';
import AuthLayout from '../../../components/layout/AuthLayout/AuthLayout';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import { authService } from '../../../services/authService';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  // Path parameter se token lo
  const { token } = useParams();
  console.log('Token from params:', token);
  
  // Sirf data states
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // Redux se loading aur error le rahe hain
  const { loading, error: reduxError } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidToken = !!token;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!isValidToken) {
      dispatch(authFail('Invalid reset link. Please request a new one.'));
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      dispatch(authFail('All fields are required'));
      return;
    }

    if (newPassword.length < 6) {
      dispatch(authFail('Password must be at least 6 characters'));
      return;
    }

    if (newPassword !== confirmNewPassword) {
      dispatch(authFail("Passwords don't match"));
      return;
    }

    setMessage('');
    
    // Redux loading true
    dispatch(authStart());

    try {
      await authService.resetPassword(token, newPassword, confirmNewPassword);
      dispatch(authComplete());
      setMessage('Password reset successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      // Redux error store
      dispatch(authFail(err.response?.data?.message || 'Failed to reset password'));
    }
  };

  // Invalid token ke liye UI
  if (!isValidToken) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="The password reset link is invalid or has expired."
        footerText="Request a new link?"
        footerLink="/forgot-password"
        footerLinkText="Forgot Password"
      >
        <div className={styles.container}>
          <div className={styles.errorMessage}>
            This password reset link is invalid or has expired.
            Please request a new password reset link.
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
      footerText="Remember your password?"
      footerLink="/login"
      footerLinkText="Back to Login"
    >
      <div className={styles.container}>
        <form onSubmit={handleResetPassword} className={styles.form}>
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={reduxError}
            placeholder="Enter new password (min 6 characters)"
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={reduxError}
            placeholder="Confirm new password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>

          {message && <div className={styles.successMessage}>{message}</div>}
          {reduxError && !message && <div className={styles.errorMessage}>{reduxError}</div>}
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;