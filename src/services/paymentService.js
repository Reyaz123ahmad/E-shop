import api from './api';

export const paymentService = {
  
  // ✅ CAPTURE PAYMENT
  capturePayment: (data) => {
    console.log("📤 capturePayment called with:", data);
    return api.post('/payment/capture-payment', data);
  },
  
  // ✅ VERIFY PAYMENT
  verifyPayment: (data) => {
    console.log("📤 verifyPayment called with:", data);
    return api.post('/payment/verifySignature', data);
  },
  
  // ✅ GET MY ORDERS
  getMyOrders: async () => {
    console.log("🔄 getMyOrders called");
    try {
      const response = await api.get('/payment/my-orders');
      return response.data;
    } catch (error) {
      console.error("❌ getMyOrders error:", error);
      throw error;
    }
  }
};