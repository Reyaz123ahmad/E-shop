
// GET PRODUCT BY ID - Page with Payment Integration
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useProductDetail from './useProductDetail';
import { productService } from '../../../services/productService';
import { deleteProductSuccess, productStart, productFail } from '../../../slices/productSlice';
import PaymentButton from '../../../components/Payment/PaymentButton';
import Button from '../../../components/common/Button/Button';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  console.log("🚀 PRODUCT DETAIL COMPONENT MOUNTED");
  
  const { productId } = useParams();
  console.log("productId from URL:", productId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

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

  // ✅ Payment success handler
  const handlePaymentSuccess = (response) => {
    console.log("Payment success:", response);
    // ✅ Navigate to orders page
    navigate('/orders');
  };

  // ✅ Payment error handler
  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
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
            
            {/* ✅ Customer: Buy Now button - Payment Component Use Karo */}
            {!isAdmin && (
              <PaymentButton
                product={currentProduct}
                quantity={quantity}
                user={user}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                className={styles.buyNowBtn}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;