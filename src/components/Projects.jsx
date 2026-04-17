import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronRight, X, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: 'E-Learning Platform',
      desc: 'Sebuah platform pembelajaran online interaktif untuk memudahkan siswa mengakses materi.',
      fullDesc: 'Aplikasi ini dibangun untuk mengatasi kendala pembelajaran jarak jauh di SMK Negeri 1. Fiturnya mencakup sistem kuis real-time, manajemen tugas terintegrasi, serta video player custom. Dibangun sepenuhnya menggunakan React dan backend serverless Firebase.',
      image: '/project1.png',
      tags: ['REACT', 'TAILWIND', 'FIREBASE'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Smart Garden IoT',
      desc: 'Sistem penyiraman tanaman otomatis berbasis IoT dengan monitoring real-time.',
      fullDesc: 'Proyek akhir IoT yang menghubungkan mikrokontroler ESP32 dengan sensor kelembapan tanah. Data dikirimkan ke cloud real-time dan divisualisasikan melalui dasbor web, memungkinkan pemantauan dan penyiraman tanaman dari jarak jauh dari mana saja.',
      image: '/project2.png',
      tags: ['ARDUINO', 'C++', 'DASHBOARD'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Redesign Website Sekolah',
      desc: 'Proyek desain ulang antarmuka website sekolah agar lebih modern dan user-friendly.',
      fullDesc: 'Studi kasus perancangan ulang UI/UX halaman beranda dan portal pendaftaran siswa baru untuk sekolah. Dimulai dari wireframing, user-testing prototype interaktif Figma, hingga translasi ke HTML/CSS semantic.',
      image: '/project3.png',
      tags: ['FIGMA', 'UI/UX', 'WEB DESIGN'],
      demoUrl: '#',
      githubUrl: '#'
    },
  ];

  return (
    <>
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <div>
            <h2 className="projects-title">Proyek Terpilih</h2>
            <p className="projects-subtitle">
              Kumpulan karya yang telah saya selesaikan selama masa sekolah.
            </p>
          </div>
          <a href="#" className="view-all">
            LIHAT SEMUA <ChevronRight size={18} />
          </a>
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
                  <div className="project-icon">
                    <ArrowUpRight size={24} />
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
