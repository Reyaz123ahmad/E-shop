// React import

// CSS module import - local styles ke liye
import styles from './Button.module.css';

// Button component - reusable button
// Props: 
//   children - button ke andar ka content
//   onClick - click handler function (call kahan hota hai: parent component se)
//   type - button type (submit, button, reset)
//   variant - primary, secondary, danger (style)
//   disabled - disabled state
//   loading - loading state (OTP send kar rahe ho to show spinner)
const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
    >
      {loading ? (
        // Loading spinner - jab API call chal rahi ho
        <span className={styles.spinner}></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;