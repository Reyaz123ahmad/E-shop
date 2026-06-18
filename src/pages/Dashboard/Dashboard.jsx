
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiShield, FiLock, FiLogOut, FiHome } from 'react-icons/fi';
import Button from '../../components/common/Button/Button';
import { logout } from '../../slices/authSlice';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FiHome className={styles.headerIcon} />
          <h1>Welcome to Dashboard!</h1>
          <p>Manage your account and settings</p>
        </div>
        
        <div className={styles.content}>
          {user && (
            <div className={styles.userInfo}>
              <h3><FiUser /> User Information</h3>
              <p>
                <FiMail className={styles.icon} />
                <strong>Email:</strong> 
                <span className={styles.value}>{user.email}</span>
              </p>
              <p>
                <FiUser className={styles.icon} />
                <strong>Name:</strong> 
                <span className={styles.value}>{user.name || 'Not provided'}</span>
              </p>
              <p>
                <FiShield className={styles.icon} />
                <strong>Role:</strong> 
                <span className={`${styles.value} ${styles.role}`}>
                  {user.role || 'Customer'}
                </span>
              </p>
            </div>
          )}
          
          <div className={styles.buttonGroup}>
            <Link to="/products" className={styles.linkButton}>
              📦 Manage Products
            </Link>
            
          </div>
        </div>
        
        <div className={styles.footer}>
          <p>&copy; 2024 E-Shop. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;