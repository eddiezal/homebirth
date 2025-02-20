import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CTA />
      <Footer />
    </div>
  );
};


export default App;
