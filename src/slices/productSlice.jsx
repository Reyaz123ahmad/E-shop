// Redux slice for product state management
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],           // All products list
  currentProduct: null,   // Single product (for detail/edit)
  loading: false,         // API call loading state
  error: null,            // Error message
  totalCount: 0           // Total products count (pagination ke liye)
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Start loading - koi bhi API call se pehle
    productStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // GET ALL PRODUCTS success
    getProductsSuccess: (state, action) => {
      state.loading = false;
       let productsData = action.payload.products;
  
       if(Array.isArray(productsData)) {
         state.products = productsData;
         state.totalCount = action.payload.totalCount || productsData.length;
       } else {
         state.products = [];
         state.totalCount = 0;
       }
      
    },
    
    // GET SINGLE PRODUCT success
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
    },
    
    // CREATE PRODUCT success
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload); // Naya product top pe add karo
    },
    
    // UPDATE PRODUCT success
    updateProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.currentProduct = action.payload;
    },
    
    // DELETE PRODUCT success
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.filter(p => p._id !== action.payload);
    },
    
    // API call fail
    productFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear current product (edit/detail page se bina time par)
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    
    // Clear error
    clearProductError: (state) => {
      state.error = null;
    }
  }
});

// Actions export
export const {
  productStart,
  getProductsSuccess,
  getProductSuccess,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
  productFail,
  clearCurrentProduct,
  clearProductError
} = productSlice.actions;

// Selectors - components mein state access karne ke liye
export const selectProducts = (state) => state.product.products;
export const selectCurrentProduct = (state) => state.product.currentProduct;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;
export const selectTotalProducts = (state) => state.product.totalCount;

export default productSlice.reducer;