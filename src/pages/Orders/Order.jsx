import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import Button from '../../components/common/Button/Button';
import styles from './Orders.module.css';

const Orders = () => {
  const navigate = useNavigate();
  const { orders, loading, error, fetchOrders } = useOrders();
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  if (loading) {
    return <div className={styles.loading}>Loading orders...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>❌ {error}</h2>
        <p>Could not load your orders. Please try again.</p>
        <Button onClick={fetchOrders}>Retry</Button>
        <Button variant="secondary" onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders yet.</p>
        <Button onClick={() => navigate('/products')}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>My Orders ({orders.length})</h1>
      
      <div className={styles.orderList}>
        {orders.map((order) => (
          <div key={order._id || order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderId}>
                Order #{order._id || order.id || 'N/A'}
              </span>
              <span className={styles.orderDate}>
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            
            <div className={styles.orderDetails}>
              <p><strong>Item:</strong> {order.itemName || 'N/A'}</p>
              <p><strong>Amount:</strong> ₹{order.totalAmount || order.amount || 0}</p>
              <p><strong>Status:</strong> 
                <span className={styles.statusSuccess}>✅ Paid</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;