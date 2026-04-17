import React from 'react';

const Marquee = () => {
  const items = [
    "FRONTEND DEVELOPMENT", 
    "UI/UX DESIGN", 
    "REACT.JS", 
    "JAVASCRIPT", 
    "TAILWIND CSS",
    "LARAVEL"
  ];
  
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="marquee-content">
            {items.map((item, index) => (
              <span key={index} className="marquee-item">
                {item} <span className="marquee-dot">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
