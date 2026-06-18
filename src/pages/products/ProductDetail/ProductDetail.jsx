// // // GET PRODUCT BY ID - Page
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import useProductDetail from './useProductDetail';
// import { productService } from '../../../services/productService';
// import { deleteProductSuccess, productStart, productFail } from '../../../slices/productSlice';
// import Button from '../../../components/common/Button/Button';
// import styles from './ProductDetail.module.css';

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





// GET PRODUCT BY ID - Page with Payment Integration
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useProductDetail from './useProductDetail';
import { productService } from '../../../services/productService';
import { deleteProductSuccess, productStart, productFail } from '../../../slices/productSlice';
import { paymentService } from '../../../services/paymentService';
import { loadAndWaitForRazorpay, openRazorpayCheckout } from '../../../utils/razorpay';
import Button from '../../../components/common/Button/Button';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  console.log("🚀 PRODUCT DETAIL COMPONENT MOUNTED");
  
  const { productId } = useParams();
  console.log("productId from URL:", productId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [paymentLoading, setPaymentLoading] = useState(false);

  console.log("🔄 Before useSelector");
  const { currentProduct, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  
  // ✅ Check if user is Admin
  const isAdmin = user?.role === 'Admin';
   
  const { fetchProduct } = useProductDetail();
  
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  console.log("Current Product:", currentProduct);
  console.log("Image URL:", currentProduct?.image);

  // ✅ Delete handler - Only for Admin
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
      // ✅ Step 1: Load Razorpay script and wait for it to be ready
      console.log("📥 Loading Razorpay...");
      await loadAndWaitForRazorpay();
      console.log("✅ Razorpay loaded successfully!");
      
      // ✅ Step 2: Create order on backend
      const orderResponse = await paymentService.capturePayment({
        product_id: currentProduct._id,
        quantity: quantity
      });
      const orderData = orderResponse.data;
      
      console.log("Order created:", orderData);
      
      // ✅ Step 3: Open Razorpay checkout
      const paymentResponse = await openRazorpayCheckout({
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.productName || currentProduct.productName,
        description: `${orderData.productDescription || currentProduct.productName} x ${quantity}`,
        order_id: orderData.orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
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
      });
      
      // ✅ Payment success
      console.log("Payment successful:", paymentResponse);
      alert(`✅ Payment Successful!\nPayment ID: ${paymentResponse.razorpay_payment_id}\nProduct: ${currentProduct.productName}\nQuantity: ${quantity}\nAmount: ₹${currentProduct.price * quantity}`);
      
      navigate('/orders');
      
    } catch (error) {
      console.error("Payment failed:", error);
      alert(error.message || 'Payment failed. Please try again.');
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
          
          {/* ✅ Quantity Selector - Sirf Customer ke liye */}
          {!isAdmin && (
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
          )}
          
          <div className={styles.actions}>
            {/* ✅ Admin: Edit + Delete buttons */}
            {isAdmin && (
              <>
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
              </>
            )}
            
            {/* ✅ Customer: Buy Now button */}
            {!isAdmin && (
              <Button 
                variant="primary" 
                onClick={handleBuyNow}
                loading={paymentLoading}
                className={styles.buyNowBtn}
              >
                Buy Now - ₹{currentProduct.price * quantity}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;