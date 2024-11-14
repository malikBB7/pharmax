import React from 'react';
import './Footer.css'; // Import CSS for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Your Company. All rights reserved.</p>
      <p>
        <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
