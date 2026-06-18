import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.highlight}>MyStore</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Discover amazing products at unbeatable prices. 
            Shop from our curated collection of premium items.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/products">
              <Button variant="primary">Shop Now</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary">Learn More</Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <span className={styles.heroEmoji}>🛍️</span>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🚀</span>
            <h3>Fast Delivery</h3>
            <p>Get your products delivered within 24-48 hours</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🔒</span>
            <h3>Secure Payments</h3>
            <p>100% secure payment gateway with Razorpay</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🛡️</span>
            <h3>Quality Guarantee</h3>
            <p>All products are verified and quality checked</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💬</span>
            <h3>24/7 Support</h3>
            <p>Our support team is always here to help you</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Ready to Start Shopping?</h2>
        <p>Browse our collection and find the perfect product for you.</p>
        <Link to="/products">
          <Button variant="primary">Explore Products</Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;