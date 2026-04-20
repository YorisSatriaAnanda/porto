import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'Introduction to Financial Literacy',
      issuer: 'Dicoding Academy',
      date: '17 April 2026',
      icon: <ShieldCheck size={28} className="text-blue-500" />,
      credentialUrl: 'https://www.dicoding.com/certificates/JMZVO4GGRXN9'
    },
    {
      title: 'Cybersecurity Essentials',
      issuer: 'Cisco Networking Academy',
      date: 'Desember 2023',
      icon: <Award size={28} className="text-purple-500" />,
      credentialUrl: '#'
    },
    {
      title: 'UI/UX Design Fundamentals',
      issuer: 'Interaction Design Foundation',
      date: 'Oktober 2023',
      icon: <Calendar size={28} className="text-green-500" />,
      credentialUrl: '#'
    }
  ];

  return (
    <section id="certifications" style={{ padding: '100px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: '64px' }}
        >
          <h2 className="about-title">Sertifikasi & Penghargaan</h2>
          <p className="contact-subtitle" style={{ margin: '0 auto' }}>
            Bukti kompetensi dan komitmen saya dalam mengasah kemampuan di bidang teknologi.
          </p>
        </motion.div>

        <div className="about-meta">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bento-card ${index === 0 ? 'bento-card-lg' : ''}`}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div 
                  className="skill-icon-wrapper" 
                  style={{ 
                    marginBottom: 0, 
                    flexShrink: 0,
                    backgroundColor: index === 0 ? 'rgba(59, 130, 246, 0.1)' : index === 1 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(34, 197, 94, 0.1)'
                  }}
                >
                  {cert.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="meta-label">{cert.issuer}</p>
                  <h3 className="meta-value" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                    {cert.title}
                  </h3>
                  <p className="meta-sub" style={{ marginBottom: '16px' }}>
                    Diterbitkan pada {cert.date}
                  </p>
                  <a 
                    href={cert.credentialUrl} 
                    className="view-all" 
                    style={{ fontSize: '12px', gap: '4px', display: 'inline-flex', alignItems: 'center' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kredensial <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
