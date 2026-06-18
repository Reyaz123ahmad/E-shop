import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { authSuccess, logout } from '../../slices/authSlice';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ✅ Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        pincode: user.pincode || ''
      });
      if (user.imageUrl) {
        setImagePreview(user.imageUrl);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Avatar click - file input open
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Image file select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file' });
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 2MB' });
      e.target.value = '';
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ✅ UPDATE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      
      // ✅ Append all fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('pincode', formData.pincode);
      
      // ✅ Append image if selected
      if (imageFile) {
        formDataToSend.append('imageFile', imageFile);
      }

      const response = await userService.updateProfile(formDataToSend);
      console.log("✅ Full Response:", response);
        console.log("✅ User Data from API:", response.data.data);
        
        // ✅ CHECK - POORA DATA AA RAHA HAI?
        console.log("📦 Phone:", response.data.data.phone);
        console.log("📦 Address:", response.data.data.address);
        console.log("📦 City:", response.data.data.city);
        console.log("📦 Pincode:", response.data.data.pincode);
      // ✅ Update Redux
      dispatch(authSuccess({
        user: response.data.data,
        token: localStorage.getItem('authToken')
      }));

      setImageFile(null);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setMessage(null);

    try {
      await userService.deleteAccount();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to delete account' 
      });
      setShowDeleteModal(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.header}>
        <h1>My Profile</h1>
        <p>Manage your personal information</p>
      </div>

      <div className={styles.profileCard}>
        {/* Avatar Section */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarLarge}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            <div className={styles.cameraIcon}>
              <span>📷</span>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <h2>{user?.name}</h2>
          <p className={styles.email}>{user?.email}</p>
          <p className={styles.clickHint}>Click on avatar to change photo</p>
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={user?.email || ''}
                disabled
              />
            </div>

            <div className={styles.formRow}>
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
              />
              <Input
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
              />
            </div>

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />

            <div className={styles.textareaGroup}>
              <label className={styles.textareaLabel}>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows={3}
                className={styles.textarea}
              />
            </div>

            {message && (
              <div className={`${styles.message} ${styles[message.type]}`}>
                {message.text}
              </div>
            )}

            <div className={styles.buttonRow}>
              <Button type="submit" variant="primary" loading={loading}>
                Update Profile
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/change-password')}
              >
                Change Password
              </Button>
            </div>
          </form>

          {/* ✅ Delete Account */}
          <div className={styles.deleteSection}>
            <hr className={styles.divider} />
            <Button 
              type="button" 
              variant="danger" 
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>
            <p className={styles.deleteWarning}>
              ⚠️ This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Delete Account</h3>
              <button className={styles.modalClose} onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to delete your account?</p>
              <p style={{ color: '#f87171', fontWeight: 500 }}>
                ⚠️ This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCancel} onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button 
                className={styles.modalDelete} 
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Yes, Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;