// Redux Toolkit se configureStore import
import { configureStore } from '@reduxjs/toolkit';
// Auth reducer import
import rootReducer from '../reducer/index';


// Store create kiya
export const store = configureStore({
    
  reducer: rootReducer,
  // Redux DevTools enable (development mein)
  
  devTools: import.meta.env.DEV
});
export default store;