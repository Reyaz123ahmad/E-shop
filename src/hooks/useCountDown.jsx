


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