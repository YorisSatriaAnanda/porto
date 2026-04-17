import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ text, className = "", delay = 0 }) => {
  // Split text into lines, then words, then characters
  const lines = text.split('\n');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ display: 'inline-block' }}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} style={{ overflow: 'hidden' }}>
          {Array.from(line).map((char, index) => (
            <motion.span
              variants={child}
              key={index}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default TextReveal;
