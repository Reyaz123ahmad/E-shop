// React Router imports
import { Routes, Route, Navigate } from 'react-router-dom';
// Pages import
import Login from '../pages/auth/Login/Login';
import Signup from '../pages/auth/Signup/Signup';
import ChangePassword from '../pages/auth/ChangePassword/ChangePassword';
import ForgotPassword from '../pages/auth/forgotPassword/forgotPassword';
import Confirmation from '../pages/auth/ForgotPassword/Confirmation';
import ResetPassword from '../pages/auth/ResetPasword/ResetPassword';
import Profile from '../pages/Profile/Profile';
// Product Pages - ✅ NEW
import ProductList from '../pages/products/ProductList/ProductList';
import ProductDetail from '../pages/products/ProductDetail/ProductDetail';
import CreateProduct from '../pages/products/CreateProduct/CreateProduct';
import EditProduct from '../pages/products/EditProduct/EditProduct';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
// ✅ New Pages
import Home from '../pages/Home/Home';

import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Orders from '../pages/Orders/Order';
// PrivateRoute import - protected routes ke liye
import PrivateRoute from './PrivateRoutes';

// Public route component - logged in users ko dashboard pe bhejna
const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(state=> state.auth.isAuthenticated);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// Main routing component
const AppRoutes = () => {
  return (
    
      <Routes>
        {/* Public routes - sirf non-logged users ke liye */}
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/change-password" element={
        <PrivateRoute>
          <ChangePassword />
        </PrivateRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/confirmation" element={
          <PublicRoute>
            <Confirmation />
          </PublicRoute>
        } />
        <Route path='/user/reset-password/:token' element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        {/* Product CRUD Routes */}
        <Route path="/products" element={
          <PrivateRoute><ProductList /></PrivateRoute>
        } />
        <Route path="/products/create" element={
          <PrivateRoute><CreateProduct /></PrivateRoute>
        } />
        <Route path="/products/:productId" element={
          <PrivateRoute><ProductDetail /></PrivateRoute>
        } />
        <Route path="/products/edit/:productId" element={
          <PrivateRoute><EditProduct /></PrivateRoute>
        } />
        
        {/* ✅ ORDERS ROUTE - ADD THIS */}
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />

        {/* Private routes - authenticated users ke liye */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    
  );
};

export default AppRoutes;