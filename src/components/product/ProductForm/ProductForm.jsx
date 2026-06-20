
// ProductForm.jsx - With file upload (no separate image API)
import { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import styles from './ProductForm.module.css';

const ProductForm = ({ initialData, onSubmit, loading, submitText = 'Save Product' }) => {
  const [formData, setFormData] = useState({
    productName: initialData?.productName || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    image: initialData?.image || ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUploading(true);
    
    try {
      // Create FormData to send both text and file
      const formDataToSend = new FormData();
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      
      if (imageFile) {
        formDataToSend.append('imageFile', imageFile);
      } else if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      // Call parent onSubmit with FormData
      onSubmit(formDataToSend);
      
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'Failed to create product' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
      <Input
        label="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        error={errors.productName}
        placeholder="Enter product name"
        required
      />
      
      <div className={styles.textareaGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={4}
          className={styles.textarea}
        />
      </div>
      
      <Input
        label="Price (₹)"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        error={errors.price}
        placeholder="Enter price"
        required
      />
      
      {/* File Upload Field */}
      <div className={styles.fileUploadGroup}>
        <label className={styles.label}>Product Image</label>
        
        {imagePreview && (
          <div className={styles.imagePreview}>
            <img src={imagePreview} alt="Preview" />
            <button 
              type="button"
              className={styles.removeBtn}
              onClick={() => {
                setImageFile(null);
                setImagePreview('');
              }}
            >
              ✕
            </button>
          </div>
        )}
        
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        
        <div className={styles.orDivider}>OR</div>
        
        <Input
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading || uploading}
      >
        {uploading ? 'Uploading...' : submitText}
      </Button>
    </form>
  );
};

export default ProductForm;