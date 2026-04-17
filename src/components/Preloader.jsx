import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 20) + 10;
          return next > 100 ? 100 : next;
        });
      }, 150);
    } else {
      setTimeout(() => {
        onComplete();
      }, 600);
    }
    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <motion.div
      className="preloader-container"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="preloader-content">
        <motion.h1 
          className="preloader-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          YORIS
        </motion.h1>
        <div className="preloader-bar-bg">
          <motion.div 
            className="preloader-bar" 
            animate={{ width: `${progress}%` }} 
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        <motion.p 
          className="preloader-percent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
