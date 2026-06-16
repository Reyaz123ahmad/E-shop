// Custom hook - ProductDetail page logic
import { useDispatch } from 'react-redux';
import { productService } from '../../../services/productService';
import { productStart, getProductSuccess, productFail } from '../../../slices/productSlice';

const useProductDetail = () => {
  const dispatch = useDispatch();
  
  // GET PRODUCT BY ID
  const fetchProduct = async (id) => {
    try {
      dispatch(productStart());
      const response = await productService.getProductById(id);
      const productData = response.data?.data || response.data;
      
      dispatch(getProductSuccess(productData));
    } catch (error) {
      dispatch(productFail(error.response?.data?.message || 'Failed to fetch product'));
    }
  };
  
  return { fetchProduct };
};

export default useProductDetail;