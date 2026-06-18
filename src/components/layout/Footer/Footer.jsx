import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section - 4 Columns */}
        <div className={styles.topSection}>
          {/* Column 1 - Brand */}
          <div className={styles.col}>
            <h3 className={styles.brand}>
              <span className={styles.brandIcon}>🛒</span>
              MyStore
            </h3>
            <p className={styles.brandDesc}>
              Your one-stop shop for premium products. 
              Quality, trust, and satisfaction guaranteed.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">📸</a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">▶️</a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">🔗</a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.colLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.colLinks}>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/returns">Returns Policy</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <ul className={styles.contactInfo}>
              <li>
                <span className={styles.contactIcon}>📍</span>
                <span>123 Main Street, City, Country</span>
              </li>
              <li>
                <span className={styles.contactIcon}>📧</span>
                <a href="mailto:support@mystore.com">support@mystore.com</a>
              </li>
              <li>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+12345678900">+1 234 567 8900</a>
              </li>
              <li>
                <span className={styles.contactIcon}>🕐</span>
                <span>Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className={styles.bottomSection}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              &copy; {currentYear} <strong>MyStore</strong>. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
          <div className={styles.paymentIcons}>
            <span>💳</span>
            <span>🟦</span>
            <span>🟨</span>
            <span>⬛</span>
            <span>💚</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;