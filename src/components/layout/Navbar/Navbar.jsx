import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../slices/authSlice';
import styles from './Navbar.module.css';













const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const dropdownRef = useRef(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart || { totalQuantity: 0 });

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Toggle profile dropdown
  const toggleProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsProfileOpen(false);
  };

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛒</span>
          <span className={styles.logoText}>MyStore</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* ✅ Cart Icon - Sirf tab dikhao jab cart items ho */}
          {isAuthenticated && totalQuantity > 0 && (
            <Link to="/cart" className={styles.cartBtn}>
              <span className={styles.cartIcon}>🛒</span>
              <span className={styles.cartBadge}>{totalQuantity}</span>
            </Link>
          )}

          {/* Auth Buttons / Profile */}
          {isAuthenticated ? (
            <div className={styles.profileWrapper} ref={dropdownRef}>
              <button 
                className={styles.profileBtn}
                onClick={toggleProfile}
              >
                <span className={styles.avatar}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                <span className={styles.userName}>{user?.name || 'User'}</span>
                <span className={`${styles.dropdownArrow} ${isProfileOpen ? styles.arrowOpen : ''}`}>▼</span>
              </button>

              {isProfileOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>{user?.name}</p>
                    <p className={styles.dropdownEmail}>{user?.email}</p>
                  </div>
                  <div className={styles.dropdownDivider}></div>
                  <Link to="/profile" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    👤 My Profile
                  </Link>
                  <Link to="/orders" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    📦 My Orders
                  </Link>
                  <Link to="/dashboard" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    📊 Dashboard
                  </Link>
                  <div className={styles.dropdownDivider}></div>
                  <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutItem}`}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>
                Login
              </Link>
              <Link to="/signup" className={styles.signupBtn}>
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button 
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuContent}>
          {/* Navigation Links */}
          <div className={styles.mobileNavLinks}>
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`${styles.mobileNavLink} ${location.pathname === link.path ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileDivider}></div>

          {/* Auth Section in Mobile */}
          {isAuthenticated ? (
            <div className={styles.mobileUserSection}>
              <div className={styles.mobileUserInfo}>
                <span className={styles.mobileAvatar}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                <div>
                  <p className={styles.mobileUserName}>{user?.name}</p>
                  <p className={styles.mobileUserEmail}>{user?.email}</p>
                </div>
              </div>
              <Link to="/profile" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                👤 My Profile
              </Link>
              <Link to="/orders" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                📦 My Orders
              </Link>
              <Link to="/dashboard" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                📊 Dashboard
              </Link>
              {totalQuantity > 0 && (
                <Link to="/cart" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                  🛒 Cart ({totalQuantity})
                </Link>
              )}
              <button onClick={handleLogout} className={`${styles.mobileNavLink} ${styles.mobileLogout}`}>
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuthButtons}>
              <Link to="/login" className={styles.mobileLoginBtn} onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className={styles.mobileSignupBtn} onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;