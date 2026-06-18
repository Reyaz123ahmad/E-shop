// Razorpay script loader - payment gateway ke liye

let razorpayLoaded = false;
let loadingPromise = null;

/**
 * Load Razorpay SDK script dynamically
 * @returns {Promise<boolean>}
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    // ✅ Agar already loaded hai to resolve karo
    if (razorpayLoaded) {
      console.log("✅ Razorpay already loaded");
      resolve(true);
      return;
    }
    
    // ✅ Agar already script exist karti hai
    if (document.getElementById('razorpay-script')) {
      razorpayLoaded = true;
      console.log("✅ Razorpay script already in DOM");
      resolve(true);
      return;
    }
    
    // ✅ Agar loading promise already exist karta hai - duplicate load se bachne ke liye
    if (loadingPromise) {
      console.log("⏳ Razorpay script already loading...");
      resolve(loadingPromise);
      return;
    }
    
    console.log("📥 Loading Razorpay script...");
    
    // ✅ Script create karo
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    // ✅ Success handler
    script.onload = () => {
      console.log("✅ Razorpay script loaded successfully!");
      razorpayLoaded = true;
      loadingPromise = null;
      resolve(true);
    };
    
    // ✅ Error handler
    script.onerror = (error) => {
      console.error("❌ Failed to load Razorpay script:", error);
      razorpayLoaded = false;
      loadingPromise = null;
      reject(new Error('Failed to load Razorpay SDK'));
    };
    
    // ✅ Append script to body
    document.body.appendChild(script);
  });
};

/**
 * Check if Razorpay is available
 * @returns {boolean}
 */
export const isRazorpayAvailable = () => {
  return typeof window.Razorpay !== 'undefined';
};

/**
 * Wait for Razorpay to be available with retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} retryDelay - Delay between retries in ms
 * @returns {Promise<boolean>}
 */
export const waitForRazorpay = (maxRetries = 5, retryDelay = 500) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const checkRazorpay = () => {
      attempts++;
      
      if (typeof window.Razorpay !== 'undefined') {
        console.log("✅ Razorpay SDK is ready!");
        razorpayLoaded = true;
        resolve(true);
        return;
      }
      
      if (attempts >= maxRetries) {
        reject(new Error('Razorpay SDK not available after maximum retries'));
        return;
      }
      
      console.log(`⏳ Waiting for Razorpay SDK... Attempt ${attempts}/${maxRetries}`);
      setTimeout(checkRazorpay, retryDelay);
    };
    
    checkRazorpay();
  });
};

/**
 * Load Razorpay and wait for it to be ready
 * @returns {Promise<boolean>}
 */
export const loadAndWaitForRazorpay = async () => {
  try {
    // Step 1: Load script
    await loadRazorpayScript();
    
    // Step 2: Wait for SDK to be available
    await waitForRazorpay();
    
    return true;
  } catch (error) {
    console.error("❌ Failed to load Razorpay:", error);
    throw error;
  }
};

/**
 * Open Razorpay checkout with options
 * @param {Object} options - Razorpay checkout options
 * @returns {Promise<Object>} - Payment response
 */
export const openRazorpayCheckout = (options) => {
  return new Promise((resolve, reject) => {
    // ✅ Check if Razorpay is available
    if (typeof window.Razorpay === 'undefined') {
      reject(new Error('Razorpay SDK not loaded. Please call loadAndWaitForRazorpay first.'));
      return;
    }
    
    try {
      const razorpay = new window.Razorpay(options);
      
      // ✅ Success handler
      razorpay.on('payment.success', (response) => {
        console.log("✅ Payment successful:", response);
        resolve(response);
      });
      
      // ✅ Error handler
      razorpay.on('payment.error', (error) => {
        console.error("❌ Payment error:", error);
        reject(error);
      });
      
      // ✅ Open checkout
      razorpay.open();
      
    } catch (error) {
      console.error("❌ Failed to open Razorpay checkout:", error);
      reject(error);
    }
  });
};