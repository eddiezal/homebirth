import React from 'react';
// Optionally import Link from react-router-dom if you plan to use routing in the future.
const Header: React.FC = () => {
  return (
    <header className="py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <img src="/logo.png" alt="Homebirth Logo" className="logo" />
        <nav>
          <ul className="list-unstyled d-flex gap-3 mb-0">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
