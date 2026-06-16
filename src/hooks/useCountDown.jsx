// // Custom hook - Countdown timer for OTP resend
// // Kahan use hota hai: VerifyOTP ya Signup page mein OTP resend button ke liye

// import { useState, useEffect } from 'react';

// const useCountdown = (initialSeconds = 30) => {
//   // State for remaining seconds
//   const [seconds, setSeconds] = useState(initialSeconds);
//   // State to check if timer is active
//   const [isActive, setIsActive] = useState(true);
  
//   // Effect to handle countdown logic
//   useEffect(() => {
//     let interval = null;
    
//     if (isActive && seconds > 0) {
//       // Har 1 second mein seconds kam karo
//       interval = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds - 1);
//       }, 1000);
//     } else if (seconds === 0) {
//       // Timer complete - active band karo
//       setIsActive(false);
//     }
    
//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, [isActive, seconds]);
  
//   // Restart timer function - resend button click par call hoga
//   const restart = () => {
//     setSeconds(initialSeconds);
//     setIsActive(true);
//   };
  
//   // Format time as MM:SS
//   const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  
//   return {
//     seconds,           // Remaining seconds (number)
//     isActive,          // Timer active hai ya nahi (boolean)
//     restart,           // Timer restart karne ka function
//     formattedTime      // Formatted time string (e.g., "0:30")
//   };
// };

// export default useCountdown;

// // --- HOW TO USE IN Signup.jsx OR VerifyOTP.jsx ---
// // const { seconds, isActive, restart, formattedTime } = useCountdown(30);
// // 
// // <button onClick={restart} disabled={isActive}>
// //   {isActive ? `Resend OTP in ${formattedTime}` : 'Resend OTP'}
// // </button>



import { useState, useEffect, useCallback, useRef } from 'react';

const useCountdown = (initialSeconds = 30) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef(null);
  
  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  
  // Start timer helper
  const startTimer = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          // Time's up - clean up and deactivate
          clearTimer();
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);
  
  // Handle timer lifecycle
  useEffect(() => {
    if (isActive && seconds > 0) {
      startTimer();
    }
    
    return clearTimer;
  }, [isActive, seconds, startTimer, clearTimer]);
  
  const restart = useCallback(() => {
    clearTimer();
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialSeconds, clearTimer]);
  
  const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  
  return {
    seconds,
    isActive,
    restart,
    formattedTime
  };
};

export default useCountdown;