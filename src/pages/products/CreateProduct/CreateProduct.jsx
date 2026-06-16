// CREATE PRODUCT - Page

import { useNavigate } from 'react-router-dom';
import useCreateProduct from './useCreateProduct';
import ProductForm from '../../../components/product/ProductForm/ProductForm';
import Button from '../../../components/common/Button/Button';
import styles from './CreateProduct.module.css';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { createProduct, loading } = useCreateProduct();
  
  const handleSubmit = async (formData) => {
    const success = await createProduct(formData);
    if (success) {
      navigate('/products');
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button variant="secondary" onClick={() => navigate('/products')}>
          ← Back
        </Button>
        <h1>Create New Product</h1>
      </div>
      
      <div className={styles.formContainer}>
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Create Product"
        />
      </div>
    </div>
  );
};

export default CreateProduct;