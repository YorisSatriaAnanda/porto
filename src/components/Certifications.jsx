import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, X, Eye, Trophy } from 'lucide-react';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      title: 'Belajar Membuat Front-End Web untuk Pemula',
      issuer: 'Dicoding Academy',
      date: 'Mei 2025',
      id: 'RVZKW31YQZD5',
      image: '/certificates/cert-fe-pemula.png',
      icon: <ShieldCheck size={24} />,
      theme: 'blue'
    },
    {
      title: 'Belajar Dasar Pemrograman JavaScript',
      issuer: 'Dicoding Academy',
      date: 'Mei 2025',
      id: 'ERZREO4VWXYV',
      image: '/certificates/cert-js-dasar.png',
      icon: <Award size={24} />,
      theme: 'purple'
    },
    {
      title: 'Belajar Dasar Pemrograman Web',
      issuer: 'Dicoding Academy',
      date: 'Mei 2025',
      id: '1OP823LO1PQK',
      image: '/certificates/cert-web-dasar.png',
      icon: <Trophy size={24} />,
      theme: 'green'
    },
    {
      title: 'Belajar Dasar Manajemen Proyek',
      issuer: 'Dicoding Academy',
      date: 'Mei 2025',
      id: '07Z674EY2PQR',
      image: '/certificates/cert-pm-dasar.png',
      icon: <Award size={24} />,
      theme: 'orange'
    },
    {
      title: 'Introduction to Financial Literacy',
      issuer: 'Dicoding Academy',
      date: 'April 2026',
      id: 'JMZVO4GGRXN9',
      image: '/certificates/cert-fin-lit.png',
      icon: <ShieldCheck size={24} />,
      theme: 'red'
    },
    {
      title: 'Financial Literacy 101',
      issuer: 'Dicoding Academy',
      date: 'Juli 2025',
      id: 'KEXL2EQ7RZG2',
      image: '/certificates/cert-fin-lit-101.png',
      icon: <ShieldCheck size={24} />,
      theme: 'cyan'
    }
  ];

  return (
    <section id="certifications" className="section-padding overflow-hidden">
      <div className="container">
        <div className="section-header-minimal">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-tag"
          >
            PENCAPAIAN
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title-modern"
          >
            Sertifikasi & <span>Keahlian</span>
          </motion.h2>
        </div>

        <div className="cert-bento-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`cert-bento-card theme-${cert.theme}`}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="cert-card-bg">
                <img src={cert.image} alt="" className="cert-bg-img" />
                <div className="cert-card-overlay" />
              </div>
              
              <div className="cert-card-content">
                <div className="cert-top">
                  <div className="cert-badge">
                    {cert.icon}
                  </div>
                  <span className="cert-date-tag">{cert.date}</span>
                </div>
                
                <div className="cert-main">
                  <h3 className="cert-name-modern">{cert.title}</h3>
                  <p className="cert-issuer-modern">{cert.issuer}</p>
                </div>
                
                <div className="cert-bottom">
                  <div className="cert-id">ID: {cert.id}</div>
                  <div className="cert-view-btn">
                    <Eye size={16} />
                    <span>Detail</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-modal-overlay"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="cert-modal-window"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <div className="modal-header-text">
                  <h3>{selectedCert.title}</h3>
                  <p>{selectedCert.issuer} • {selectedCert.date}</p>
                </div>
                <button className="modal-close-btn" onClick={() => setSelectedCert(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="cert-modal-body">
                <img src={selectedCert.image} alt={selectedCert.title} className="cert-modal-img" />
              </div>
              <div className="cert-modal-footer">
                <a 
                  href={`https://www.dicoding.com/certificates/${selectedCert.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-cert-primary"
                >
                  <ExternalLink size={18} /> Verifikasi Sertifikat
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
