import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronRight, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = 'yorissatriaananda@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { icon: <FaGithub size={24} />, href: 'https://github.com/YorisSatriaAnanda' },
    { icon: <FaLinkedin size={24} />, href: '#' },
    { icon: <FaInstagram size={24} />, href: 'https://www.instagram.com/fhuzin_?igsh=MWU0c3lhb2Vndjkybg==' },
    { icon: <FaTwitter size={24} />, href: '#' },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="contact-title">Mari Berkolaborasi</h2>
        <p className="contact-subtitle">
          Punya ide menarik atau sekadar ingin menyapa? Saya selalu terbuka untuk diskusi baru.
        </p>

        {/* Email Card */}
        <div 
          onClick={handleCopy}
          className="email-card"
        >
          <div className="email-info">
            <div className="email-icon-box">
              <Mail size={28} />
            </div>
            <div>
              <p className="email-label">EMAIL</p>
              <h3 className="email-address">{email}</h3>
            </div>
          </div>
          <div className="text-muted">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="text-green-500" size={24} />
                </motion.div>
              ) : (
                <ChevronRight size={24} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Social Icons */}
        <div className="social-grid">
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="social-link"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Footer minimal */}
      <footer className="footer">
        © 2024 PORTFOLIO. ALL RIGHTS RESERVED.
      </footer>
      </div>
    </section>
  );
};

export default Contact;
