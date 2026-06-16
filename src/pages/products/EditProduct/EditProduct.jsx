// UPDATE PRODUCT - Page
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useEditProduct from './useEditProduct';
import ProductForm from '../../../components/product/ProductForm/ProductForm';
import Button from '../../../components/common/Button/Button';
import styles from './EditProduct.module.css';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currentProduct, loading } = useSelector((state) => state.product);
  
  const { fetchProduct, updateProduct, updateLoading } = useEditProduct();
  
  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);
  
  const handleSubmit = async (formData) => {
    const success = await updateProduct(productId, formData);
    if (success) {
      navigate(`/products/${productId}`);
    }
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button variant="secondary" onClick={() => navigate(`/products/${productId}`)}>
          ← Back
        </Button>
        <h1>Edit Product</h1>
      </div>
      
      <div className={styles.formContainer}>
        <ProductForm
          initialData={currentProduct}
          onSubmit={handleSubmit}
          loading={updateLoading}
          submitText="Update Product"
        />
      </div>
    </div>
  );
};

export default EditProduct;




