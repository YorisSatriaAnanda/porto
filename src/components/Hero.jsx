import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import TextReveal from './TextReveal';

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      {/* Background radial gradient */}
      <div className="hero-bg-accent" />
      
      {/* Animated Floating Blob */}
      <div className="hero-blob-wrapper">
        <div className="blob-shape" />
      </div>

      <div className="container relative z-10">
        <div className="hero-content">
          {/* Badge */}
          <Magnetic>
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap size={16} />
              SISWA KELAS 11 • SMK
            </motion.div>
          </Magnetic>

          {/* Title */}
          <h1 className="hero-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              CREATIVE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-muted"
            >
              DEVELOPER
            </motion.div>
          </h1>

          {/* Description */}
          <motion.p 
            className="hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Seorang siswa kelas 11 yang berfokus pada pengembangan web kreatif 
            dan solusi digital interaktif dengan estetika modern.
          </motion.p>

          {/* Buttons */}
          <div className="hero-btns">
            <Magnetic>
              <motion.a 
                href="#projects" 
                className="btn btn-primary hero-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Lihat Proyek <ArrowRight size={18} />
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a 
                href="#contact" 
                className="btn btn-secondary hero-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hubungi Saya
              </motion.a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Scroll indicator line */}
      <div className="scroll-indicator" />
    </section>
  );
};

export default Hero;
