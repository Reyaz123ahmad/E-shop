// Redux slice for orders state management
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],           // All orders
  currentOrder: null,   // Single order detail
  loading: false,
  error: null,
  totalOrders: 0
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Start loading
    orderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // GET ALL ORDERS success
    getOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload || [];
      state.totalOrders = state.orders.length;
    },
    
    // GET SINGLE ORDER success
    getOrderSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    },
    
    // CREATE ORDER success (payment ke baad)
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.unshift(action.payload);
      state.totalOrders += 1;
    },
    
    // API call fail
    orderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear current order
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    
    // Clear error
    clearOrderError: (state) => {
      state.error = null;
    }
  }
});

// Actions export
export const {
  orderStart,
  getOrdersSuccess,
  getOrderSuccess,
  createOrderSuccess,
  orderFail,
  clearCurrentOrder,
  clearOrderError
} = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrderLoading = (state) => state.order.loading;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;