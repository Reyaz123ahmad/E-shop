


// GET ALL PRODUCTS - Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useProductList from './useProductList';
import ProductCard from '../../../components/product/ProductCard/ProductCard';
import Button from '../../../components/common/Button/Button';
import Modal from '../../../components/common/Modal/Modal';
import styles from './ProductList.module.css';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  
  // ✅ Check if user is Admin
  const isAdmin = user?.role === 'Admin';
  
  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Custom hook se functions le rahe hain
  const { fetchProducts, deleteProduct, deleteLoading } = useProductList();
  
  // Load products on mount
  React.useEffect(() => {
    fetchProducts();
  }, []);
  
  // Delete click handler
  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };
  
  // Confirm delete
  const handleConfirmDelete = async () => {
    await deleteProduct(selectedProductId);
    setDeleteModalOpen(false);
    setSelectedProductId(null);
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Products</h1>
        
        {/* ✅ Admin: Add New Product | Customer: My Orders */}
        {isAdmin ? (
          <Button onClick={() => navigate('/products/create')} variant="primary">
            + Add New Product
          </Button>
        ) : (
          <Button onClick={() => navigate('/orders')} variant="primary">
            📦 My Orders
          </Button>
        )}
      </div>
      
      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>No products found.</p>
          {isAdmin && (
            <Button onClick={() => navigate('/products/create')}>
              Create your first product
            </Button>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Modal - Sirf Admin ke liye */}
      {isAdmin && (
        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Product"
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
        >
          <p>Are you sure you want to delete this product?</p>
          <p style={{ color: '#dc2626', marginTop: '8px' }}>This action cannot be undone.</p>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;