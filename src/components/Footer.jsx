import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub size={20} />, href: 'https://github.com/YorisSatriaAnanda', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/yorissatriaananda', label: 'LinkedIn' },
    { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/fhuzin_?igsh=MWU0c3lhb2Vndjkybg==', label: 'Instagram' },
    { icon: <SiLinktree size={20} />, href: 'https://linktr.ee/yorissatriaananda', label: 'Linktree' },
  ];

  return (
    <footer className="footer-professional">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col">
            <a href="#" className="logo">
              PORTFOLIO<span>.</span>
            </a>
            <p className="footer-bio">
              Siswa SMK kelas 11 yang berfokus pada pengembangan web kreatif dan solusi digital interaktif.
            </p>
          </div>

          {/* Links Column */}
          <div className="footer-col">
            <h4 className="footer-title">Navigasi</h4>
            <ul className="footer-links">
              <li><a href="#about">Tentang</a></li>
              <li><a href="#skills">Keahlian</a></li>
              <li><a href="#projects">Proyek</a></li>
              <li><a href="#contact">Kontak</a></li>
            </ul>
          </div>

          {/* Status Column */}
          <div className="footer-col">
            <h4 className="footer-title">Status Saat Ini</h4>
            <div className="availability-tag">
              <span className="pulse-dot"></span>
              Tersedia untuk proyek baru
            </div>
            <div className="footer-socials-mini">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.href} 
                  aria-label={link.label}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} YORIS SATRIA ANANDA. ALL RIGHTS RESERVED.</p>
          <p>Dibuat dengan ❤️ & React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
