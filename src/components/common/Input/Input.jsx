import { useState } from 'react';
import styles from './Input.module.css';

// Input component - reusable input field
// Props:
//   label - input ke upar label text
//   type - text, email, password, etc.
//   value - input ki value (parent se aayega)
//   onChange - value change handler (parent ka function)
//   error - error message (validation.js se aayega)
//   placeholder - placeholder text
//   required - required field ya nahi
const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  name
}) => {
  // Password show/hide ke liye state - sirf password type ke liye
  const [showPassword, setShowPassword] = useState(false);
  
  // Agar password type hai to input type toggle karo
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className={styles.inputGroup}>
      {/* Label - agar label diya hai to show karo */}
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {/* Actual input field */}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        
        {/* Password toggle button - sirf password type ke liye */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggleBtn}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      
      {/* Error message - validation fail hone par dikhega */}
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
};

export default Input;