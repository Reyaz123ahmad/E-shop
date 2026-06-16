// // GET PRODUCT BY ID - Page
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useProductDetail from './useProductDetail';
import { productService } from '../../../services/productService';
import { deleteProductSuccess, productStart, productFail } from '../../../slices/productSlice';
import Button from '../../../components/common/Button/Button';
import styles from './ProductDetail.module.css';

// const ProductDetail = () => {
//   console.log("🚀 PRODUCT DETAIL COMPONENT MOUNTED");
  
//   const { productId } = useParams();
//   console.log("productId from URL:", productId);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   console.log("🔄 Before useSelector");
//   const { currentProduct, loading } = useSelector((state) => state.product);
   
//   const { fetchProduct } = useProductDetail();
  
//   useEffect(() => {
//     fetchProduct(productId);
//   }, [productId]);
//   // Add this debug code
// console.log("Current Product:", currentProduct);
// console.log("Image URL:", currentProduct?.image);
//   // Delete handler
//   const handleDelete = async () => {
//     if (window.confirm(`Are you sure you want to delete "${currentProduct?.productName}"?`)) {
//       try {
//         dispatch(productStart());
//         await productService.deleteProduct(productId);
//         dispatch(deleteProductSuccess(productId));
//         navigate('/products');
//       } catch (error) {
//         dispatch(productFail(error.response?.data?.message || 'Failed to delete product'));
//       }
//     }
//   };
  
//   if (loading) {
//     return <div className={styles.loading}>Loading product details...</div>;
//   }
  
//   if (!currentProduct) {
//     return <div className={styles.notFound}>Product not found</div>;
//   }
  
//   return (
//     <div className={styles.container}>
//       <Button variant="secondary" onClick={() => navigate('/products')}>
//         ← Back to Products
//       </Button>
      
//       <div className={styles.productDetail}>
//         <div className={styles.imageSection}>
//           <img 
//             src={currentProduct.image || 'https://via.placeholder.com/400'} 
//             alt={currentProduct.productName}
//             className={styles.image}
//           />
//         </div>
        
//         <div className={styles.infoSection}>
//           <h1 className={styles.name}>{currentProduct.productName}</h1>
//           <p className={styles.price}>₹{currentProduct.price}</p>
//           <p className={styles.description}>{currentProduct.description}</p>
          
//           <div className={styles.actions}>
//             <Button 
//               variant="primary" 
//               onClick={() => navigate(`/products/edit/${productId}`)}
//             >
//               Edit Product
//             </Button>
//             <Button 
//               variant="danger" 
//               onClick={handleDelete}  // ✅ Use handleDelete function
//             >
//               Delete Product
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;





import { paymentService } from '../../../services/paymentService';
import { loadRazorpayScript } from '../../../utils/razorpay';


import useOrders from '../../../hooks/useOrders';

const ProductDetail = () => {
  console.log("🚀 PRODUCT DETAIL COMPONENT MOUNTED");
  
  const { productId } = useParams();
  console.log("productId from URL:", productId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Quantity state for Buy Now
  const [quantity, setQuantity] = useState(1);
  const [paymentLoading, setPaymentLoading] = useState(false);

  console.log("🔄 Before useSelector");
  const { currentProduct, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  
  const { fetchProduct } = useProductDetail();
  const { addOrder } = useOrders();
  
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  console.log("Current Product:", currentProduct);
  console.log("Image URL:", currentProduct?.image);

  // Delete handler
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${currentProduct?.productName}"?`)) {
      try {
        dispatch(productStart());
        await productService.deleteProduct(productId);
        dispatch(deleteProductSuccess(productId));
        navigate('/products');
      } catch (error) {
        dispatch(productFail(error.response?.data?.message || 'Failed to delete product'));
      }
    }
  };

  // ✅ BUY NOW HANDLER - Direct payment without cart
  const handleBuyNow = async () => {
    if (!currentProduct) {
      alert('Product not found');
      return;
    }
    
    setPaymentLoading(true);
    
    try {
      // Step 1: Load Razorpay script
      await loadRazorpayScript();
      
      // Step 2: Create order on backend - quantity bhi bhejo
      const orderResponse = await paymentService.capturePayment(
        currentProduct._id,  // ✅ Sirf ID - pehla parameter
        quantity             // ✅ Quantity - doosra parameter
      );
      const orderData = orderResponse.data;
      
      console.log("Order created:", orderData);
      
      // Step 3: Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.productName || currentProduct.productName,
        description: `${orderData.productDescription || currentProduct.productName} x ${quantity}`,
        order_id: orderData.orderId,
        // ✅ IMAGE PROPERTY HATAO - CORS error fix
        handler: async (response) => {
          // Payment success - backend verify karega via webhook
          console.log("Payment successful:", response);
          
          // ✅ Add order to Redux store
          addOrder({
            _id: response.razorpay_order_id,
            itemName: currentProduct.productName,
            totalAmount: currentProduct.price * quantity,
            quantity: quantity,
            createdAt: new Date().toISOString(),
            paymentId: response.razorpay_payment_id
          });
          
          // ✅ Show success message
          alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}\nProduct: ${currentProduct.productName}\nQuantity: ${quantity}\nAmount: ₹${currentProduct.price * quantity}`);
          
          // ✅ Navigate to orders page
          navigate('/orders');
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
            setPaymentLoading(false);
          }
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error("Payment failed:", error);
      
      // ✅ Better error message
      const errorMsg = error.response?.data?.message || error.message || 'Payment failed. Please try again.';
      alert(`❌ Payment Failed: ${errorMsg}`);
      
    } finally {
      setPaymentLoading(false);
    }
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }
  
  if (!currentProduct) {
    return <div className={styles.notFound}>Product not found</div>;
  }
  
  return (
    <div className={styles.container}>
      <Button variant="secondary" onClick={() => navigate('/products')}>
        ← Back to Products
      </Button>
      
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <img 
            src={currentProduct.image || 'https://via.placeholder.com/400'} 
            alt={currentProduct.productName}
            className={styles.image}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400';
            }}
          />
        </div>
        
        <div className={styles.infoSection}>
          <h1 className={styles.name}>{currentProduct.productName}</h1>
          <p className={styles.price}>₹{currentProduct.price}</p>
          <p className={styles.description}>{currentProduct.description}</p>
          
          {/* ✅ Quantity Selector */}
          <div className={styles.quantitySection}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.quantityInput}
            />
          </div>
          
          <div className={styles.actions}>
            {/* ✅ BUY NOW BUTTON */}
            <Button 
              variant="primary" 
              onClick={handleBuyNow}
              loading={paymentLoading}
              className={styles.buyNowBtn}
            >
              Buy Now - ₹{currentProduct.price * quantity}
            </Button>
            
            <Button 
              variant="primary" 
              onClick={() => navigate(`/products/edit/${productId}`)}
            >
              Edit Product
            </Button>
            
            <Button 
              variant="danger" 
              onClick={handleDelete}
            >
              Delete Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;