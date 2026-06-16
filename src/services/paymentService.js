// Payment API calls - Razorpay integration
import api from './api';

export const paymentService = {
  
  // ✅ CAPTURE PAYMENT - Create Razorpay order for direct product purchase
  // Call hota hai: ProductDetail.jsx mein Buy Now click par
  capturePayment: (productId, quantity) => {
    return api.post('/payment/capture-payment', {
      product_id: String(productId), 
      quantity: quantity
    });
  },
  
  // ✅ VERIFY SIGNATURE - Webhook verification (optional, backend handles)
  // Sirf reference ke liye - backend webhook handle karega
  verifySignature: (paymentData) => {
    return api.post('/payment/verifySignature', paymentData);
  },
  // GET ALL ORDERS - User ke saare orders
  getMyOrders: () => {
    return api.get('/payment/my-orders');
  }
};