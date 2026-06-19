import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import Button from '../common/Button/Button';
import toast from 'react-hot-toast';

const PaymentButton = ({ 
  product, 
  quantity = 1, 
  user,
  onSuccess,
  onError,
  buttonText,
  className 
}) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const hasLoadedScript = useRef(false);

  // ✅ SCRIPT LOAD
  useEffect(() => {
    let script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      hasLoadedScript.current = true;
    }
  }, []);

  // ✅ PAYMENT HANDLER WITH SIGNATURE VERIFICATION
  const handlePayment = async () => {
    console.log(import.meta.env.VITE_RAZORPAY_KEY);
    if (!product) {
      toast.error('Product not found');
      return;
    }

    setPaymentLoading(true);

    try {
      // ✅ Step 1: Create order
      console.log("📦 Creating order for product:", product._id);
      const orderResponse = await paymentService.capturePayment({
        product_id: product._id,
        quantity: quantity
      });
      const orderData = orderResponse.data;
      console.log("✅ Order created:", orderData);

      // ✅ Step 2: Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.productName || product.productName,
        description: `${orderData.productDescription || product.productName} x ${quantity}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          console.log("✅ Payment successful:", response);
          
          // ✅ Step 3: VERIFY SIGNATURE - TERE JAISA
          try {
            console.log("🔐 Verifying signature...");
            const verifyResponse = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              product_id: product._id,
              quantity: quantity
            });
            
            console.log("✅ Signature verified:", verifyResponse.data);
            toast.success('Payment successful! Order confirmed.');
            
            if (onSuccess) {
              onSuccess(response);
            }
          } catch (verifyError) {
            console.error("❌ Signature verification failed:", verifyError);
            toast.error('Payment verification failed. Please contact support.');
            
            if (onError) {
              onError(verifyError);
            }
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled by user");
            toast.error('Payment cancelled');
            setPaymentLoading(false);
          }
        }
      };

      // ✅ Step 4: Open Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("❌ Payment failed:", error);
      toast.error(error.message || 'Payment failed. Please try again.');
      
      if (onError) {
        onError(error);
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <Button 
      variant="primary" 
      onClick={handlePayment}
      loading={paymentLoading}
      className={className}
      disabled={paymentLoading}
    >
      {buttonText || `Buy Now - ₹${(product?.price || 0) * quantity}`}
    </Button>
  );
};

export default PaymentButton;





