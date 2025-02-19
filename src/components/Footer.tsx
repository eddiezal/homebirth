import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-3 bg-light">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Homebirth.com. All rights reserved.</p>
        <div className="social-media d-flex justify-content-center gap-3">
          <a href="https://facebook.com" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
