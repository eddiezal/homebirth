import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="cta py-5">
      <div className="container text-center">
        <form className="d-flex justify-content-center align-items-center gap-2">
          <input 
            type="email" 
            className="form-control w-auto" 
            placeholder="Enter your email" 
            aria-label="Email address" 
            required 
          />
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        {/* Future enhancement: Insert a countdown timer component here */}
      </div>
    </section>
  );
};

export default CTA;
