import { useRef, useEffect } from 'react';
import styles from './OTPInput.module.css';

// OTPInput component - 6 digit OTP input field
// Props:
//   value - OTP value (string, parent se aayega)
//   onChange - OTP change handler (parent ka function)
//   error - error message (validation.js se aayega)
//   length - OTP length (default 6)
const OTPInput = ({ value = '', onChange, error, length = 6 }) => {
  // Input refs array - har digit ke liye alag ref
  const inputRefs = useRef([]);
  
  // Har input change par focus auto move karne ke liye
  useEffect(() => {
    // Pehle empty input pe focus karo
    const firstEmptyIndex = value.length;
    if (firstEmptyIndex < length && inputRefs.current[firstEmptyIndex]) {
      inputRefs.current[firstEmptyIndex].focus();
    }
  }, [value, length]);
  
  // Input change handler - user digit daale to call hota hai
  const handleChange = (index, digit) => {
    // Sirf digit accept karo (0-9)
    if (!/^\d*$/.test(digit)) return;
    
    // Naya OTP value banao
    const newOTP = value.split('');
    newOTP[index] = digit;
    const newValue = newOTP.join('');
    
    // Parent component ka onChange call karo
    onChange(newValue);
    
    // Automatic next input pe focus karo
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Backspace handler - pichle input pe jao
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  // Paste handler - full OTP ek saath paste karne ke liye
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    // Sirf digits extract karo
    const digits = pastedData.replace(/\D/g, '').slice(0, length);
    if (digits) {
      onChange(digits);
    }
  };
  
  return (
    <div className={styles.otpContainer}>
      {/* 6 input boxes generate karo */}
      <div className={styles.otpInputs}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`${styles.otpInput} ${error ? styles.otpInputError : ''}`}
          />
        ))}
      </div>
      {/* Error message */}
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
};

export default OTPInput;