const {emailStyles, changePasswordStyles, forgotPasswordStyles, baseStyles} = require('./styles/emailStyles');


exports.otpEmailTemplate = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <title>OTP Verification - E-Shop</title>
    ${baseStyles}
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="header-icon">🔐</div>
            <h1>Verify Your Email</h1>
            <p>Complete your registration process</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello, <strong>Valued Customer</strong>! 
            </div>
            
            <div class="message">
                <p>Thank you for choosing E-Shop. Please use the following OTP to complete your registration:</p>
            </div>
            
            <div class="otp-box">
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;">Your One-Time Password (OTP)</p>
                <div class="otp-code">${otp}</div>
                <p style="color: #999; font-size: 12px; margin-top: 10px;">This OTP is valid for 5 minutes</p>
            </div>
            
            <div class="message">
                <p style="font-size: 13px; color: #666;">If you didn't request this, please ignore this email.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>🔒 For security reasons, never share this OTP with anyone</p>
            <p>📧 Need help? Contact us at support@eshop.com</p>
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};

exports.welcomeEmailTemplate = (newUser) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <title>Welcome to E-Shop!</title>
    ${baseStyles}
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="header-icon">🎉</div>
            <h1>Welcome Aboard!</h1>
            <p>Thank you for joining E-Shop</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello, <strong>${newUser.name || 'Valued Customer'}</strong>! 🎊
            </div>
            
            <div class="welcome-box">
                <div class="welcome-icon">🚀</div>
                <h2>Welcome to Our Community!</h2>
                <p>We're excited to have you on board.</p>
            </div>
            
            <div class="message">
                <p>Start exploring thousands of products, exclusive deals, and amazing discounts.</p>
                <p style="margin-top: 15px;">Your journey with us begins now!</p>
            </div>
            
            <div style="text-align: center;">
                <a href="#" class="button">Start Shopping</a>
            </div>
        </div>
        
        <div class="footer">
            <p>🎁 Get 10% off on your first order - Use code: WELCOME10</p>
            <p>📧 Have questions? Contact us at support@eshop.com</p>
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};


exports.orderConfirmationEmailTemplate = (user, order) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - E-Shop</title>
      ${emailStyles}
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>🎉 Order Confirmed!</h1>
              <p>Thank you for shopping with us</p>
          </div>
          
          <div class="content">
              <div class="greeting">
                  Hello, <strong>${user.name || 'Valued Customer'}</strong>! 👋
              </div>
              
              <div class="order-card">
                  <div class="order-title">
                      Order Details
                      <span class="badge">Confirmed</span>
                  </div>
                  
                  <div class="order-detail">
                      <span class="label">Order ID:</span>
                      <span class="value">#${order._id?.toString().slice(-8) || 'N/A'}</span>
                  </div>
                  
                  <div class="order-detail">
                      <span class="label">Product Name:</span>
                      <span class="value">${order.itemName || order.name || 'N/A'}</span>
                  </div>
                  
                  <div class="price">
                      Total Amount: ₹${order.totalAmount || order.price || 0}
                  </div>
              </div>
              
              <div class="address-box">
                  <div class="address-title">📦 Shipping Address</div>
                  <p>${order.address?.street || 'N/A'}</p>
                  <p>PIN Code: ${order.address?.pin || 'N/A'}</p>
              </div>
          </div>
          
          <div class="footer">
              <p>Your order will be delivered within 3-5 business days</p>
              <p>📧 For any queries, contact us at support@eshop.com</p>
              <a href="#" class="btn">Track Your Order</a>
              <p style="margin-top: 20px; font-size: 12px;">&copy; 2026 E-Shop. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
};

exports.sellerOrderEmailTemplate = (user, sellerDetails, order) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Received - E-Shop Seller</title>
      ${emailStyles}
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>📦 New Order Received!</h1>
              <p>You've got a new order from a customer</p>
          </div>
          
          <div class="content">
              <div class="greeting">
                  Hello, <strong>${sellerDetails.sellerName || 'Seller'}</strong>! 🎉
              </div>
              
              <div class="order-card">
                  <div class="order-title">
                      Order Summary
                      <span class="badge">Pending Processing</span>
                  </div>
                  
                  <div class="order-detail">
                      <span class="label">Order ID:</span>
                      <span class="value">#${order._id?.toString().slice(-8) || 'N/A'}</span>
                  </div>
                  
                  <div class="order-detail">
                      <span class="label">Product Name:</span>
                      <span class="value">${order.itemName || 'N/A'}</span>
                  </div>
                 
                  <div class="price">
                      Total Amount: ₹${order.totalAmount || 0}
                  </div>
              </div>
              
              <div class="address-box">
                  <div class="address-title">👤 Customer Details</div>
                  <p><strong>Name:</strong> ${user?.name || 'N/A'}</p>
                  <p><strong>Email:</strong> ${user?.email || 'N/A'}</p>
              </div>
              
              <div class="address-box">
                  <div class="address-title">📦 Shipping Address</div>
                  <p>${order.address?.street || 'N/A'}</p>
                  <p>PIN Code: ${order.address?.pin || 'N/A'}</p>
              </div>
          </div>
          
          <div class="footer">
              <p>Please process this order within 24 hours</p>
              <p>📞 Contact customer: ${user?.phone || 'Not provided'}</p>
              <a href="#" class="btn">View Order Details</a>
              <p style="margin-top: 20px; font-size: 12px;">&copy; 2026 E-Shop Seller Portal</p>
          </div>
      </div>
  </body>
  </html>`;
};


exports.forgotPasswordEmailTemplate = (user, resetUrl) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <title>Reset Your Password - E-Shop</title>
    ${forgotPasswordStyles}
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="header-icon">🔐</div>
            <h1>Reset Your Password</h1>
            <p>Secure your account in minutes</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello, <strong>${user.name || 'Valued Customer'}</strong>! 
            </div>
            
            <div class="message-box">
                <p>We received a request to reset your password for your E-Shop account.</p>
                <p>Click the button below to create a new password. This link will expire in <strong>10 minutes</strong>.</p>
            </div>
            
            <div style="text-align: center;">
                <a href="${resetUrl}" class="btn">Reset Password</a>
            </div>
            
            <div class="reset-link">
                <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Or copy this link:</p>
                <a href="${resetUrl}">${resetUrl}</a>
            </div>
            
            <div class="warning-box">
                <p>🔒 <strong>Didn't request this?</strong></p>
                <p>If you didn't request a password reset, please ignore this email. Your password will not be changed.</p>
                <p>For security reasons, do not share this link with anyone.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>🔒 This link will expire in 10 minutes</p>
            <p>📧 Need help? Contact us at <a href="mailto:support@eshop.com">support@eshop.com</a></p>
            <div class="divider"></div>
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
            <p style="font-size: 11px;">This is an automated message, please do not reply.</p>
        </div>
    </div>
</body>
</html>`;
};

exports.changePasswordEmailTemplate = (user) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Changed - E-Shop</title>
      ${changePasswordStyles}
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <div class="emoji">🔐</div>
              <h1>Password Changed</h1>
              <p>Your account security is our priority</p>
          </div>
          
          <div class="content">
              <div class="greeting">
                  Hello, <strong>${user.name || 'Valued Customer'}</strong>! 
              </div>
              
              <div class="success-box">
                  <h2>Password Updated Successfully!</h2>
                  <p>Your account password has been changed.</p>
              </div>
              
              <div class="security-tip">
                  <p>🔒 <strong>Didn't request this change?</strong></p>
                  <p>If you didn't change your password, please contact our support team immediately.</p>
                  <p>Secure your account by enabling 2-factor authentication.</p>
              </div>
              
              <div class="divider"></div>
              
              <div style="text-align: center;">
                  <p style="color: #666; font-size: 14px;">Need help? Contact our support team</p>
                  <a href="mailto:support@eshop.com" class="btn">Contact Support</a>
              </div>
          </div>
          
          <div class="footer">
              <p>🔒 This change was made from your account</p>
              <p>📧 If this wasn't you, please reset your password immediately at <a href="#">eshop.com/reset-password</a></p>
              <div class="divider"></div>
              <p style="font-size: 11px;">&copy; 2024 E-Shop. All rights reserved.</p>
              <p style="font-size: 11px;">This is an automated message, please do not reply.</p>
          </div>
      </div>
  </body>
  </html>`;
};