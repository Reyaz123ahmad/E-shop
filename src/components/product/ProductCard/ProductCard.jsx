// import { useNavigate } from 'react-router-dom';
// import Button from '../../common/Button/Button';
// import styles from './ProductCard.module.css';

// const ProductCard = ({ product, onDelete }) => {
//   const navigate = useNavigate();
  
//   return (
//     <div className={styles.card}>
//       <div className={styles.imageContainer}>
//         <img 
//           src={product.image || 'https://via.placeholder.com/200'} 
//           alt={product.productName}
//           className={styles.image}
//         />
//       </div>
      
//       <div className={styles.content}>
//         <h3 className={styles.name}>{product.productName}</h3>
//         <p className={styles.description}>{product.description?.substring(0, 100)}</p>
//         <p className={styles.price}>₹{product.price}</p>
//       </div>
      
//       <div className={styles.actions}>
//         <Button 
//           variant="secondary" 
//           onClick={() => navigate(`/products/${product._id}`)}
//           size="small"
//         >
//           View
//         </Button>
//         <Button 
//           variant="primary" 
//           onClick={() => navigate(`/products/edit/${product._id}`)}
//           size="small"
//         >
//           Edit
//         </Button>
//         <Button 
//           variant="danger" 
//           onClick={() => onDelete(product._id)}
//           size="small"
//         >
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;








import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  // ✅ Check if user is Admin
  const isAdmin = user?.role === 'Admin';
  
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image || 'https://via.placeholder.com/200'} 
          alt={product.productName}
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{product.productName}</h3>
        <p className={styles.description}>{product.description?.substring(0, 100)}</p>
        <p className={styles.price}>₹{product.price}</p>
      </div>
      
      <div className={styles.actions}>
        {/* ✅ View button - Sabko dikhega */}
        <Button 
          variant="secondary" 
          onClick={() => navigate(`/products/${product._id}`)}
          size="small"
        >
          View
        </Button>
        
        {/* ✅ Admin: Edit + Delete buttons */}
        {isAdmin && (
          <>
            <Button 
              variant="primary" 
              onClick={() => navigate(`/products/edit/${product._id}`)}
              size="small"
            >
              Edit
            </Button>
            <Button 
              variant="danger" 
              onClick={() => onDelete(product._id)}
              size="small"
            >
              Delete
            </Button>
          </>
        )}
        
        {/* ✅ Customer: Buy Now button */}
        {!isAdmin && (
          <Button 
            variant="primary" 
            onClick={() => navigate(`/products/${product._id}`)}
            size="small"
            className={styles.buyBtn}
          >
            Buy Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;