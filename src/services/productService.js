// Product API calls - sare CRUD operations yahan
// Kahan use hota hai: Pages/products/* ke hooks mein

import api from './api';

export const productService = {
  
  // 1. CREATE PRODUCT - POST /api/products
  // Call hota hai: CreateProduct.jsx se
  createProduct: (productData) => {
    return api.post('/product/', productData);
  },
  
  // 2. GET ALL PRODUCTS - GET /api/products
  // Call hota hai: ProductList.jsx se
  getAllProducts: () => {
    return api.get('/product/');
  },
  
  // 3. GET PRODUCT BY ID - GET /api/products/:id
  // Call hota hai: ProductDetail.jsx se
  getProductById: (productId) => {
    return api.get(`/product/${productId}`);
  },
  
  // 4. UPDATE PRODUCT - PUT /api/products/:id
  // Call hota hai: EditProduct.jsx se
  updateProduct: (productId, productData) => {
    return api.put(`/product/update/${productId}`, productData);
  },
  
  // 5. DELETE PRODUCT - DELETE /api/products/:id
  // Call hota hai: ProductList.jsx ya ProductDetail.jsx se
  deleteProduct: (productId) => {
    return api.delete(`/product/delete/${productId}`);
  }
};