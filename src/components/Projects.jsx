import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronRight, X, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects = [
    {
      title: 'Noir Bookshelf',
      desc: 'Aplikasi manajemen buku pribadi minimalis berbasis Web Storage dengan desain responsif bertema Noir yang elegan',
      fullDesc: 'Menerapkan fitur CRUD (Create, Read, Update, Delete) yang memungkinkan pengguna menambah, menghapus, serta memindahkan buku antar rak "Selesai" dan "Belum Selesai".',
      image: '/project1.png',
      tags: ['HTML', 'CSS', 'JAVASCRIPT'],
      demoUrl: 'https://yorissatriaananda.github.io/BookShelf/',
      githubUrl: 'https://github.com/YorisSatriaAnanda/e-learning-platform'
    },
    {
      title: 'GreenHouse IoT Hub',
      desc: 'Sistem otomasi pertanian cerdas untuk efisiensi penggunaan sumber daya.',
      fullDesc: 'Menghubungkan sensor kelembaban tanah dan suhu udara ke dashboard web real-time melalui mikrokontroler ESP32. Memungkinkan pemantauan kondisi tanaman secara remote melalui koneksi internet dan pengiriman notifikasi jika tanaman membutuhkan air.',
      image: '/project2.png',
      tags: ['ESP32', 'C++', 'FIREBASE'],
      demoUrl: 'https://iot-dashboard-yoris.web.app',
      githubUrl: 'https://github.com/YorisSatriaAnanda/smart-garden-iot'
    },
    {
      title: 'Edu-Portal Redesign',
      desc: 'Optimasi pengalaman pengguna untuk portal pendaftaran siswa baru.',
      fullDesc: 'Studi kasus desain ulang UI untuk meningkatkan conversion rate pendaftaran siswa. Berfokus pada kemudahan navigasi, hierarki visual yang jelas, dan form pendaftaran yang simpel. Dimulai dari riset pengguna hingga implementasi prototype interaktif di Figma.',
      image: '/project3.png',
      tags: ['FIGMA', 'UI/UX', 'PROTOTYPING'],
      demoUrl: 'https://www.figma.com/file/placeholder',
      githubUrl: '#'
    },
  ];

  return (
    <>
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="projects-title">Proyek Terpilih</h2>
            <p className="projects-subtitle">
              Kumpulan karya yang telah saya selesaikan selama masa sekolah.
            </p>
          </motion.div>
          <motion.a 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            href="#" 
            className="view-all"
          >
            LIHAT SEMUA <ChevronRight size={18} />
          </motion.a>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-img-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-img"
                />
                <div className="project-overlay">
                  <div className="project-view-btn">
                    <span>Lihat Detail</span>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="project-name">
                  {project.title}
                </h3>
                <p className="project-desc">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>
              
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="modal-header-img"
              />
              
              <div className="modal-body">
                <div className="project-tags" style={{ marginBottom: '24px' }}>
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="tag" style={{ background: 'var(--text-primary)', color: 'var(--bg-color)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="projects-title" style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>
                  {selectedProject.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '32px' }}>
                  {selectedProject.fullDesc}
                </p>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a href={selectedProject.demoUrl} className="btn btn-primary">
                    <ExternalLink size={20} /> Lihat Demo
                  </a>
                  <a href={selectedProject.githubUrl} className="btn btn-secondary">
                    <FaGithub size={20} /> Kode Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
