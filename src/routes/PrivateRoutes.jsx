// React Router se navigate import
import { Navigate } from 'react-router-dom';
// Redux se selector import
import { useSelector } from 'react-redux';


// PrivateRoute component - sirf authenticated users ko access dena
// Kahan use hota hai: AppRoutes.jsx mein
const PrivateRoute = ({ children }) => {
  // Redux se authenticated status le rahe hain
  const isAuthenticated = useSelector(state=> state.auth.isAuthenticated);
  
  // Agar authenticated nahi hai to login page pe bhej do
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;