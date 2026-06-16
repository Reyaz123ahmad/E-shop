// Reusable Modal component - Delete confirmation ke liye
// Kahan use hota hai: ProductList.jsx mein delete confirm ke liye

import { useEffect } from 'react';
import styles from './Modal.module.css';
import Button from '../Button/Button';

const Modal = ({ isOpen, onClose, title, children, onConfirm, loading = false }) => {
  
  // ESC key press se modal close karne ke liye
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Background scroll band
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.body}>
          {children}
        </div>
        
        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm}
            loading={loading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;