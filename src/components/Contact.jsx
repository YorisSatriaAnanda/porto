import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronRight, Check, Copy } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent
  const email = 'yorissatriaananda@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { icon: <FaGithub size={24} />, href: 'https://github.com/YorisSatriaAnanda' },
    { icon: <FaLinkedin size={24} />, href: 'https://linkedin.com/in/yorissatriaananda' },
    { icon: <FaInstagram size={24} />, href: 'https://www.instagram.com/fhuzin_?igsh=MWU0c3lhb2Vndjkybg==' },
    { icon: <SiLinktree size={24} />, href: 'https://linktr.ee/yorissatriaananda' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const formData = new FormData(e.target);
      const response = await fetch("https://formsubmit.co/ajax/yorissatriaananda@gmail.com", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        setFormStatus('sent');
        e.target.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('idle');
        alert("Maaf, terjadi kesalahan saat mengirim pesan.");
      }
    } catch (error) {
      console.error(error);
      setFormStatus('idle');
      alert("Maaf, gagal mengirim pesan. Periksa koneksi internet Anda.");
    }
  };

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
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-form-container"
          >
            <form 
              className="contact-form" 
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Pesan</label>
                <textarea id="message" name="message" rows="5" placeholder="Halo Yoris, saya tertarik untuk..." required></textarea>
              </div>
              <button 
                type="submit" 
                className={`btn btn-primary btn-full py-4 ${formStatus !== 'idle' ? 'opacity-70 pointer-events-none' : ''}`}
                disabled={formStatus !== 'idle'}
              >
                {formStatus === 'idle' && <>Kirim Pesan <ChevronRight size={18} /></>}
                {formStatus === 'sending' && <>Mengirim...</>}
                {formStatus === 'sent' && <>Terkirim! <Check size={18} /></>}
              </button>
            </form>

            {/* Success Notification Toast */}
            <AnimatePresence>
              {formStatus === 'sent' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="success-toast"
                >
                  <div className="success-toast-content">
                    <div className="success-icon-box">
                      <Check size={20} />
                    </div>
                    <div>
                      <p className="success-toast-title">Pesan Terkirim!</p>
                      <p className="success-toast-sub">Terima kasih, saya akan segera menghubungi Anda.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Contact Info (Bento Grid) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="contact-info-grid"
          >
            {/* Email Card - Large */}
            <div 
              onClick={handleCopy}
              className="bento-card bento-card-lg email-card"
            >
              <div className="email-info">
                <div className="email-icon-box">
                  <Mail size={28} />
                </div>
                <div className="text-left">
                  <p className="meta-label">EMAIL</p>
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
                    <Copy size={20} />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Location Card */}
            <div className="bento-card location-card">
              <div className="location-header">
                <p className="meta-label">LOKASI</p>
                <div className="location-dot"></div>
              </div>
              <h3 className="location-city">Bogor, Indonesia</h3>
              <p className="location-tz">WIB (GMT+7)</p>
            </div>

            {/* Socials Card */}
            <div className="bento-card socials-card">
              <p className="meta-label" style={{ marginBottom: '16px' }}>SOSIAL MEDIA</p>
              <div className="social-grid-minimal">
                {socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="social-link-minimal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default Contact;
