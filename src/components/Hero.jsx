import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import TextReveal from './TextReveal';

const Hero = () => {
  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);

  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  };

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
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GraduationCap size={16} />
            SISWA KELAS 11 • SMK
          </motion.div>

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

          <div className="hero-btns">
            <motion.a 
              ref={btnRef1}
              href="#projects" 
              className="btn btn-primary hero-btn spotlight-btn"
              onMouseMove={(e) => handleMouseMove(e, btnRef1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Lihat Proyek</span> <ArrowRight size={18} className="relative z-10" />
            </motion.a>
            <motion.a 
              ref={btnRef2}
              href="/cv.pdf" 
              download
              className="btn btn-secondary hero-btn spotlight-btn"
              onMouseMove={(e) => handleMouseMove(e, btnRef2)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Download CV</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll indicator line */}
      <div className="scroll-indicator" />
    </section>
  );
};

export default Hero;
