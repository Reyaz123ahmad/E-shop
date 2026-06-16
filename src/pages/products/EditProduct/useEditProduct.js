
// Custom hook - EditProduct page logic
import { useDispatch, useSelector } from 'react-redux';  // ✅ Add useSelector
import { productService } from '../../../services/productService';
import { 
  productStart, 
  getProductSuccess, 
  updateProductSuccess, 
  productFail 
} from '../../../slices/productSlice';

const useEditProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);  // ✅ Redux loading state
  
  // GET PRODUCT BY ID (for edit form)
  const fetchProduct = async (id) => {
    try {
      dispatch(productStart());
      const response = await productService.getProductById(id);
      
      // Extract product correctly
      const productData = response.data?.data || response.data;
      dispatch(getProductSuccess(productData));
    } catch (error) {
      dispatch(productFail(error.response?.data?.message || 'Failed to fetch product'));
    }
  };
  
  // UPDATE PRODUCT
  const updateProduct = async (id, productData) => {
    try {
      dispatch(productStart());
      const response = await productService.updateProduct(id, productData);
      dispatch(updateProductSuccess(response.data));
      return true;
    } catch (error) {
      dispatch(productFail(error.response?.data?.message || 'Failed to update product'));
      return false;
    }
  };
  
  return { fetchProduct, updateProduct, updateLoading: loading };  // ✅ Return Redux loading
};

export default useEditProduct;