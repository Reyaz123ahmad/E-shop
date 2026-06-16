
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, authStart, authFail, authComplete } from '../../../slices/authSlice';
import AuthLayout from '../../../components/layout/AuthLayout/AuthLayout';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import { authService } from '../../../services/authService';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // Redux se loading aur error le rahe hain
  const { loading, error } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Error states for validation
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

  const validatePassword = (pwd) => {
    if (!pwd) return 'Current password is required';
    return null;
  };

  const validateNewPassword = (pwd) => {
    if (!pwd) return 'New password is required';
    if (pwd.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const validateConfirmNewPassword = (pwd, confirmPwd) => {
    if (!confirmPwd) return 'Please confirm your password';
    if (pwd !== confirmPwd) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordErr = validatePassword(password);
    const newErr = validateNewPassword(newPassword);
    const confirmErr = validateConfirmNewPassword(newPassword, confirmNewPassword);

    setPasswordError(passwordErr || '');
    setNewPasswordError(newErr || '');
    setConfirmNewPasswordError(confirmErr || '');

    if (passwordErr || newErr || confirmErr) return;

    setMessage('');
    
    // Redux actions - reducer state update karega
    dispatch(authStart());

    try {
      await authService.changePassword(password, newPassword, confirmNewPassword);
      
      dispatch(authComplete());
      setMessage('Password changed successfully! Redirecting to login...');
      
      setTimeout(() => {
        dispatch(logout());
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      // Redux reducer error store karega
      dispatch(authFail(err.response?.data?.message || 'Failed to change password'));
    }
  };

  return (
    <AuthLayout
      title="Change Password"
      subtitle="Update your password to keep your account secure"
      footerText="Back to Dashboard"
      footerLink="/dashboard"
      footerLinkText="Go to Dashboard"
    >
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Current Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            placeholder="Enter current password"
            required
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={newPasswordError}
            placeholder="Enter new password (min 6 characters)"
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={confirmNewPasswordError}
            placeholder="Confirm new password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}  // Redux loading state
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </Button>

          {message && <div className={styles.successMessage}>{message}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>

        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>🔒 Password Requirements:</p>
          <ul className={styles.infoList}>
            <li>Minimum 6 characters long</li>
            <li>Use a combination of letters and numbers</li>
            <li>Avoid using common passwords</li>
            <li>Don't use the same password as before</li>
          </ul>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ChangePassword;