import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import TextReveal from './TextReveal';

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        >
          {/* Badge */}
          <div className="hero-badge">
            <GraduationCap size={16} />
            SISWA KELAS 11 • SMK
          </div>

          {/* Title */}
          <h1 className="hero-title">
            <TextReveal text="CREATIVE" />
            <br />
            <span className="text-muted">
              <TextReveal text="DEVELOPER" delay={0.2} />
            </span>
          </h1>

          {/* Description */}
          <p className="hero-desc">
            Seorang siswa kelas 11 yang terpaksa belajar ngoding
          </p>

          {/* Buttons */}
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary hero-btn">
              Lihat Proyek
            </a>
            <a href="#contact" className="btn btn-secondary hero-btn">
              Hubungi Saya
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator line */}
      <div className="scroll-indicator" />
    </section>
  );
};

export default Hero;
