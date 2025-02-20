import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      className="hero d-flex align-items-center"
      style={{
        minHeight: '100vh', // Ensure the hero section occupies full viewport height
        backgroundImage: 'url(/path/to/hero-image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#F6E9D8', // Fallback color in case the image doesn't load
      }}
    >
      <div className="container text-center">
        <h1>Welcome to Homebirth.com</h1>
        <p>Your Birth. Your Way.</p>
      </div>
    </section>
  );
};

export default Hero;
