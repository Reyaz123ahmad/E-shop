import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import productReducer from "../slices/productSlice"
import orderReducer from "../slices/orderSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  order: orderReducer
  
})

export default rootReducer
