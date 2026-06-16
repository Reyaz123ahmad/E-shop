// src/assets/images/Logo.jsx - React component logo
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="url(#gradient)" />
    <path d="M12 14L14 26H26L28 14H12Z" stroke="white" strokeWidth="2" fill="none" />
    <path d="M16 14V12C16 10 18 8 20 8C22 8 24 10 24 12V14" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="17" cy="20" r="1.5" fill="white" />
    <circle cx="23" cy="20" r="1.5" fill="white" />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#667eea" />
        <stop offset="1" stopColor="#764ba2" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;