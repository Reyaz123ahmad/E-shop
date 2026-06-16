// Razorpay script loader - payment gateway ke liye

let razorpayLoaded = false;

// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    // Agar already loaded hai to resolve karo
    if (razorpayLoaded) {
      resolve(true);
      return;
    }
    
    // Agar script already exist karti hai
    if (document.getElementById('razorpay-script')) {
      razorpayLoaded = true;
      resolve(true);
      return;
    }
    
    // Script create karo
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      razorpayLoaded = true;
      resolve(true);
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay SDK'));
    };
    
    document.body.appendChild(script);
  });
};

// Check if Razorpay is available
export const isRazorpayAvailable = () => {
  return typeof window.Razorpay !== 'undefined';
};