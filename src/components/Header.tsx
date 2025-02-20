import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  // State to track if the header is scrolled and if the mobile menu is open
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle the 'scrolled' state when scrolling beyond 50px
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
