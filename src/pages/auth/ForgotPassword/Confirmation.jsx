// Confirmation.jsx - Using the CSS module
import { Link, useLocation } from 'react-router-dom';
import AuthLayout from '../../../components/layout/AuthLayout/AuthLayout';
import styles from './Confirmation.module.css';

const Confirmation = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <AuthLayout
      title="Check Your Email"
      subtitle={`We've sent a reset link to ${email}`}
      footerText="Remember password?"
      footerLink="/login"
      footerLinkText="Back to Login"
    >
      <div className={styles.container}>
        <div className={styles.icon}>📧</div>
        
        <h2 className={styles.title}>Reset Link Sent!</h2>
        
        <p className={styles.subtitle}>
          Please check your email inbox and click the reset link to create a new password.
        </p>
        
        <div className={styles.card}>
          <div className={styles.cardTitle}>📬 Email Sent To</div>
          <div className={styles.emailBox}>{email}</div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardTitle}>⏰ What's Next?</div>
          <div className={styles.cardText}>
            1. Open your email inbox<br />
            2. Click on the password reset link<br />
            3. Create a new password<br />
            4. Login with your new password
          </div>
        </div>
        
        <div className={styles.message}>
          💡 Didn't receive the email? Check your spam folder or{' '}
          <Link to="/forgot-password" className={styles.link}>
            try again
          </Link>
        </div>
        
        <div className={styles.buttonGroup}>
          <Link to="/login" className={`${styles.btn} ${styles.btnPrimary}`}>
            Back to Login
          </Link>
        </div>
        
        <div className={styles.resendInfo}>
          <span>Haven't received the link? </span>
          <button 
            className={styles.resendLink}
            onClick={() => window.location.href = '/forgot-password'}
          >
            Resend Email
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Confirmation;