
// Custom hook - CreateProduct page logic
import { useDispatch, useSelector } from 'react-redux';
import { productService } from '../../../services/productService';
import { productStart, createProductSuccess, productFail } from '../../../slices/productSlice';

const useCreateProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);  // ✅ Redux loading state
  
  // CREATE PRODUCT
  const createProduct = async (productData) => {
    try {
      dispatch(productStart());  // loading = true
      const response = await productService.createProduct(productData);
      dispatch(createProductSuccess(response.data));  // loading = false
      return true;
    } catch (error) {
      dispatch(productFail(error.response?.data?.message || 'Failed to create product'));  // loading = false
      return false;
    }
  };
  
  return { createProduct, loading };  // ✅ Return Redux loading state
};

export default useCreateProduct;