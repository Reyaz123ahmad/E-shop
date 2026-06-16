// emailTemplate/styles/emailStyles.js

// emailTemplate/styles/emailStyles.js - Common styles for both

const baseStyles = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .email-container {
      max-width: 500px;
      width: 100%;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.4s ease-out;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 32px 24px;
      text-align: center;
    }
    
    .header-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }
    
    .header h1 {
      color: white;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }
    
    .content {
      padding: 32px 24px;
    }
    
    .otp-box {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      margin: 20px 0;
    }
    
    .otp-code {
      font-size: 42px;
      font-weight: 700;
      letter-spacing: 8px;
      color: #667eea;
      background: white;
      padding: 16px;
      border-radius: 12px;
      font-family: monospace;
      margin: 10px 0;
    }
    
    .greeting {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
      border-left: 4px solid #667eea;
      padding-left: 15px;
    }
    
    .greeting strong {
      color: #667eea;
    }
    
    .message {
      color: #555;
      line-height: 1.6;
      margin: 20px 0;
    }
    
    .welcome-box {
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      margin: 20px 0;
    }
    
    .welcome-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }
    
    .welcome-box h2 {
      color: #2e7d32;
      font-size: 22px;
      margin-bottom: 10px;
    }
    
    .welcome-box p {
      color: #1b5e20;
    }
    
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 30px;
      font-weight: 600;
      margin: 20px 0;
    }
    
    .footer {
      background: #f8f9fa;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    
    .footer p {
      color: #999;
      font-size: 12px;
      margin: 5px 0;
    }
    
    @media (max-width: 480px) {
      body {
        padding: 10px;
      }
      
      .email-container {
        border-radius: 20px;
      }
      
      .header {
        padding: 24px 20px;
      }
      
      .header h1 {
        font-size: 22px;
      }
      
      .content {
        padding: 24px 20px;
      }
      
      .otp-code {
        font-size: 32px;
        letter-spacing: 6px;
      }
    }
  </style>
`;


const emailStyles = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: slideIn 0.5s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    .header p {
      font-size: 16px;
      opacity: 0.9;
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 18px;
      color: #333;
      margin-bottom: 25px;
      border-left: 4px solid #667eea;
      padding-left: 15px;
    }
    
    .greeting strong {
      color: #667eea;
      font-size: 20px;
    }
    
    .order-card {
      background: #f8f9fa;
      border-radius: 15px;
      padding: 25px;
      margin: 25px 0;
      border: 1px solid #e0e0e0;
      transition: transform 0.3s ease;
    }
    
    .order-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .order-title {
      font-size: 20px;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #667eea;
    }
    
    .order-detail {
      margin: 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
    }
    
    .order-detail .label {
      font-weight: 600;
      color: #666;
      font-size: 14px;
    }
    
    .order-detail .value {
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
    
    .price {
      font-size: 24px;
      font-weight: 700;
      color: #4CAF50;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 2px dashed #e0e0e0;
      text-align: right;
    }
    
    .address-box {
      background: white;
      border-radius: 10px;
      padding: 15px;
      margin-top: 15px;
      border: 1px solid #e0e0e0;
    }
    
    .address-title {
      font-weight: 700;
      color: #667eea;
      margin-bottom: 10px;
      font-size: 14px;
      text-transform: uppercase;
    }
    
    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    
    .footer p {
      color: #666;
      font-size: 14px;
      margin: 10px 0;
    }
    
    .btn {
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 25px;
      margin-top: 20px;
      font-weight: 600;
      transition: transform 0.3s ease;
    }
    
    .btn:hover {
      transform: translateY(-2px);
    }
    
    .badge {
      display: inline-block;
      padding: 5px 12px;
      background: #4CAF50;
      color: white;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 10px;
    }
    
    @media (max-width: 480px) {
      .email-container {
        margin: 20px;
      }
      
      .content {
        padding: 25px 20px;
      }
      
      .order-detail {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
    }
  </style>
`;








// emailTemplate/styles/emailStyles.js
const changePasswordStyles = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px 10px;
    }
    
    .email-container {
      max-width: 100%;
      width: 100%;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    
    .header .emoji {
      font-size: 40px;
      margin-bottom: 8px;
    }
    
    .header h1 {
      font-size: 24px;
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .header p {
      font-size: 14px;
      opacity: 0.9;
    }
    
    .content {
      padding: 25px 20px;
    }
    
    .greeting {
      font-size: 16px;
      color: #333;
      margin-bottom: 20px;
      border-left: 4px solid #4CAF50;
      padding-left: 12px;
    }
    
    .greeting strong {
      color: #4CAF50;
      font-size: 18px;
    }
    
    .success-box {
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    
    .success-box h2 {
      color: #2e7d32;
      margin-bottom: 8px;
      font-size: 20px;
    }
    
    .success-box p {
      color: #1b5e20;
      line-height: 1.5;
      font-size: 14px;
    }
    
    .security-tip {
      background: #fff3e0;
      border-radius: 10px;
      padding: 15px;
      margin: 20px 0;
    }
    
    .security-tip p {
      color: #e65100;
      font-size: 12px;
      margin: 5px 0;
      line-height: 1.4;
    }
    
    .divider {
      height: 1px;
      background: #e0e0e0;
      margin: 20px 0;
    }
    
    .btn {
      display: inline-block;
      padding: 12px 25px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 600;
      font-size: 14px;
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
    
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    
    .footer p {
      color: #666;
      font-size: 11px;
      margin: 6px 0;
      line-height: 1.4;
    }
    
    /* Mobile specific */
    @media (max-width: 480px) {
      body {
        padding: 10px;
      }
      
      .header {
        padding: 20px 15px;
      }
      
      .header .emoji {
        font-size: 35px;
      }
      
      .header h1 {
        font-size: 20px;
      }
      
      .content {
        padding: 20px 15px;
      }
      
      .greeting {
        font-size: 14px;
      }
      
      .greeting strong {
        font-size: 16px;
      }
      
      .success-box {
        padding: 15px;
      }
      
      .success-box h2 {
        font-size: 18px;
      }
      
      .success-box p {
        font-size: 13px;
      }
      
      .btn {
        padding: 10px 20px;
        font-size: 13px;
      }
    }
    
    /* Tablet */
    @media (min-width: 481px) and (max-width: 768px) {
      .email-container {
        max-width: 90%;
      }
      
      .header h1 {
        font-size: 22px;
      }
      
      .content {
        padding: 30px 25px;
      }
    }
    
    /* Desktop */
    @media (min-width: 769px) {
      .email-container {
        max-width: 550px;
      }
      
      body {
        padding: 40px 0;
      }
    }
  </style>
`;

// emailTemplate/styles/emailStyles.js - Add forgot password styles

const forgotPasswordStyles = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .email-container {
      max-width: 500px;
      width: 100%;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.4s ease-out;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 32px 24px;
      text-align: center;
    }
    
    .header-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }
    
    .header h1 {
      color: white;
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }
    
    .content {
      padding: 32px 24px;
    }
    
    .greeting {
      font-size: 16px;
      color: #333;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f0f0f0;
    }
    
    .greeting strong {
      color: #667eea;
      font-size: 18px;
    }
    
    .message-box {
      background: #f8f9fa;
      border-radius: 16px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    
    .message-box p {
      color: #555;
      line-height: 1.6;
      font-size: 14px;
    }
    
    .reset-link {
      background: #f0f0f0;
      border-radius: 12px;
      padding: 16px;
      margin: 20px 0;
      word-break: break-all;
    }
    
    .reset-link a {
      color: #667eea;
      text-decoration: none;
      font-size: 13px;
      display: block;
      word-break: break-all;
    }
    
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 15px;
      margin: 20px 0;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
    
    .warning-box {
      background: #fff3e0;
      border-left: 4px solid #ff9800;
      padding: 16px;
      margin: 24px 0;
      border-radius: 8px;
    }
    
    .warning-box p {
      color: #e65100;
      font-size: 13px;
      margin: 5px 0;
      line-height: 1.5;
    }
    
    .warning-box strong {
      color: #bf360c;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e0e0e0, transparent);
      margin: 24px 0;
    }
    
    .footer {
      background: #f8f9fa;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    
    .footer p {
      color: #999;
      font-size: 12px;
      margin: 6px 0;
    }
    
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    
    @media (max-width: 480px) {
      body {
        padding: 10px;
      }
      
      .email-container {
        border-radius: 20px;
      }
      
      .header {
        padding: 24px 20px;
      }
      
      .header h1 {
        font-size: 22px;
      }
      
      .content {
        padding: 24px 20px;
      }
      
      .btn {
        padding: 12px 28px;
        font-size: 14px;
        width: 100%;
        text-align: center;
      }
      
      .greeting {
        font-size: 15px;
      }
      
      .greeting strong {
        font-size: 16px;
      }
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
      .email-container {
        max-width: 90%;
      }
    }
  </style>
`;




module.exports = { emailStyles, changePasswordStyles, forgotPasswordStyles, baseStyles  };