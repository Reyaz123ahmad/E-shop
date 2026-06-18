import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Data:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with us.</p>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📍</span>
            <div>
              <h4>Address</h4>
              <p>123 Main Street, City, Country</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📧</span>
            <div>
              <h4>Email</h4>
              <p>support@mystore.com</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📞</span>
            <div>
              <h4>Phone</h4>
              <p>+1 234 567 8900</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>🕐</span>
            <div>
              <h4>Working Hours</h4>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Send us a Message</h2>
          {submitted ? (
            <div className={styles.successMessage}>
              ✅ Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Input
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
              />
              <div className={styles.textareaGroup}>
                <label className={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows={5}
                  className={styles.textarea}
                  required
                />
              </div>
              <Button type="submit" variant="primary" fullWidth>
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;