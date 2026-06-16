// Environment variables ko export kar rahe hain

// API Base URL - .env file se aayega
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// App name
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'MyApp';

// OTP settings
export const OTP_LENGTH = 6;
export const OTP_RESEND_DELAY = 30; // seconds

// Other configs
export const TOKEN_KEY = 'authToken';
export const USER_KEY = 'user';







// ✅ Razorpay Configuration
export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
export const CURRENCY = 'INR';