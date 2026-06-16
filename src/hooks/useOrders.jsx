// Custom hook - All order related operations
import { useDispatch, useSelector } from 'react-redux';
import { paymentService } from '../services/paymentService';
import {
  orderStart,
  getOrdersSuccess,
  createOrderSuccess,
  orderFail,
  selectOrders,
  selectOrderLoading
} from '../slices/orderSlice';

const useOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector((state) => state.order.error);
  
  // GET ALL ORDERS
  const fetchOrders = async () => {
    try {
      dispatch(orderStart());
      const response = await paymentService.getMyOrders();
      
      // Safely extract orders array
      let ordersData = [];
      if (response.data && Array.isArray(response.data)) {
        ordersData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        ordersData = response.data.data;
      }
      
      dispatch(getOrdersSuccess(ordersData));
      return ordersData;
      
    } catch (error) {
      dispatch(orderFail(error.response?.data?.message || 'Failed to fetch orders'));
      return [];
    }
  };
  
  // ADD ORDER AFTER PAYMENT (optional - agar payment success par add karna ho)
  const addOrder = (orderData) => {
    dispatch(createOrderSuccess(orderData));
  };
  
  return {
    orders,
    loading,
    error,
    fetchOrders,
    addOrder
  };
};

export default useOrders;