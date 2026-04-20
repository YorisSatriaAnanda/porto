import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const name = "YORIS";

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader-container"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } 
      }}
    >
      <div className="preloader-content">
        <div className="preloader-title-wrapper">
          {name.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="preloader-letter"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1,
                ease: [0.33, 1, 0.68, 1]
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        
        <motion.div 
          className="preloader-line-container"
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        >
          <div className="preloader-line" />
        </motion.div>

        <motion.p
          className="preloader-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
        >
          CREATIVE DEVELOPER
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
