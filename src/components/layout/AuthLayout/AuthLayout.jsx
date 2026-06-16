
import { Link } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import Logo from '../../../assets/images/Logo';
// AuthLayout component - login, signup, forgot password pages ke liye common layout
// Props:
//   children - page ka content
//   title - page ka heading (Login, Signup, Forgot Password)
//   subtitle - page ka subheading
//   footerText - bottom mein link ka text
//   footerLink - bottom mein link ka path
//   footerLinkText - bottom mein link ka display text
const AuthLayout = ({ 
  children, 
  title, 
  subtitle,
  footerText,
  footerLink,
  footerLinkText
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <span className={styles.logoText}>E-Shop</span>
      </div>
      {/* Left side - form section */}
      <div className={styles.formSection}>
        <div className={styles.card}>
          {/* Logo */}
          <div className={styles.logo}>
            <img src="/src/assets/images/Logo" alt="Logo" />
          </div>
          
          {/* Heading */}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          
          {/* Form content - page specific */}
          <div className={styles.content}>
            {children}
          </div>
          
          {/* Footer link - login/signup ke beech switch karne ke liye */}
          {footerText && footerLink && (
            <div className={styles.footer}>
              <span>{footerText}</span>
              <Link to={footerLink} className={styles.link}>
                {footerLinkText}
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - background image/branding */}
      <div className={styles.brandSection}>
        <div className={styles.brandContent}>
          <h2>Welcome Back!</h2>
          <p>Login to access your dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;