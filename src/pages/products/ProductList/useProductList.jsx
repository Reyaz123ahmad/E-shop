
// Custom hook - ProductList page logic
import { useDispatch, useSelector } from 'react-redux';  // ✅ Add useSelector
import { productService } from '../../../services/productService';
import { 
  productStart, 
  getProductsSuccess, 
  productFail,
  deleteProductSuccess 
} from '../../../slices/productSlice';

const useProductList = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);  // ✅ Redux loading
  
  // GET ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      dispatch(productStart());
      const response = await productService.getAllProducts();
      
      console.log("API Response:", response.data);
      
      // Extract products array from response
      let productsArray = [];
      const apiData = response.data?.data;
      
      if (Array.isArray(apiData)) {
        productsArray = apiData;
      } else if (apiData && typeof apiData === 'object') {
        // Single product ko array mein convert
        productsArray = [apiData];
      }
      
      dispatch(getProductsSuccess({ 
        products: productsArray,
        totalCount: productsArray.length 
      }));
    } catch (error) {
      dispatch(productFail(error.response?.data?.message || 'Failed to fetch products'));
    }
  };
  
  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      dispatch(productStart());
      await productService.deleteProduct(id);
      dispatch(deleteProductSuccess(id));
      return true;
    } catch (error) {
      dispatch(productFail(error.response?.data?.message || 'Failed to delete product'));
      return false;
    }
  };
  
  return {
    fetchProducts,
    deleteProduct,
    deleteLoading: loading  // ✅ Redux loading state
  };
};

export default useProductList;