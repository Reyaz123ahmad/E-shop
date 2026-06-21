// Product API calls - sare CRUD operations yahan
import api from './api';

export const productService = {
  
  // ✅ CREATE PRODUCT - FormData ke liye
  createProduct: (productData) => {
    return api.post('/product/', productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
  },
  
  // GET ALL PRODUCTS
  getAllProducts: () => {
    return api.get('/product/');
  },
  
  // GET PRODUCT BY ID
  getProductById: (productId) => {
    return api.get(`/product/${productId}`);
  },
  
  // ✅ UPDATE PRODUCT - FormData ke liye
  updateProduct: (productId, productData) => {
    return api.put(`/product/update/${productId}`, productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
  },
  
  // DELETE PRODUCT
  deleteProduct: (productId) => {
    return api.delete(`/product/delete/${productId}`);
  }
};