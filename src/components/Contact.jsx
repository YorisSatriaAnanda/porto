import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronRight, Check, Copy } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';

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
    { icon: <SiLinktree size={24} />, href: 'https://linktr.ee/yorissatriaananda' },
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

        <div className="contact-grid">
          {/* Left: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-form-container"
          >
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Pesan</label>
                <textarea id="message" rows="5" placeholder="Halo Yoris, saya tertarik untuk..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full py-4">
                Kirim Pesan <ChevronRight size={18} />
              </button>
            </form>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="contact-info-container"
          >
            <div 
              onClick={handleCopy}
              className="email-card"
              style={{ width: '100%', marginBottom: '24px' }}
            >
              <div className="email-info">
                <div className="email-icon-box">
                  <Mail size={28} />
                </div>
                <div className="text-left">
                  <p className="email-label">EMAIL</p>
                  <h3 className="email-address" style={{ fontSize: '1rem' }}>{email}</h3>
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
                    <Copy size={20} />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="info-text">
              Atau temukan saya di platform lain:
            </p>

            <div className="social-grid-minimal">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className="social-link-minimal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

          </motion.div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default Contact;
