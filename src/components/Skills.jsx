import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Terminal, Cpu } from 'lucide-react';
import {
  SiGo, SiLaravel, SiReact, SiNestjs, SiInertia,
  SiTailwindcss, SiMongodb, SiJavascript, SiTypescript,
  SiPostgresql, SiMysql, SiDocker, SiGithub, SiPhp
} from 'react-icons/si';
import TextReveal from './TextReveal';

const Skills = () => {
  const skills = [
    {
      title: 'Frontend Development',
      desc: 'Membangun antarmuka web yang responsif dan interaktif menggunakan teknologi modern.',
      icon: <Code2 className="text-blue-500" size={28} />,
      color: 'rgba(59, 130, 246, 0.1)',
      techs: ['React.js', 'JavaScript', 'Tailwind CSS', 'Vite']
    },
    {
      title: 'UI/UX Design',
      desc: 'Merancang pengalaman pengguna yang intuitif dengan estetika visual yang bersih.',
      icon: <Palette className="text-purple-500" size={28} />,
      color: 'rgba(168, 85, 247, 0.1)',
      techs: ['Figma', 'Adobe XD', 'Prototyping', 'Design System']
    },
    {
      title: 'Backend Development',
      desc: 'Membangun logika server dan manajemen database yang efisien dan aman.',
      icon: <Terminal className="text-green-500" size={28} />,
      color: 'rgba(34, 197, 94, 0.1)',
      techs: ['Laravel', 'PHP', 'MySQL', 'REST API']
    },
    {
      title: 'Hardware & IoT',
      desc: 'Integrasi perangkat keras dengan sistem cerdas untuk otomasi.',
      icon: <Cpu className="text-orange-500" size={28} />,
      color: 'rgba(249, 115, 22, 0.1)',
      techs: ['Arduino', 'ESP32', 'Sensors', 'Blynk']
    },
  ];

  const techStack = [
    { name: 'PHP', icon: <SiPhp style={{ color: '#777BB4' }} /> },
    { name: 'JAVASCRIPT', icon: <SiJavascript style={{ color: '#F7DF1E' }} /> },
    { name: 'TAILWIND CSS', icon: <SiTailwindcss style={{ color: '#06B6D4' }} /> },
    { name: 'REACT.JS', icon: <SiReact style={{ color: '#61DAFB' }} /> },
    { name: 'MYSQL', icon: <SiMysql style={{ color: '#4479A1' }} /> },
    { name: 'LARAVEL', icon: <SiLaravel style={{ color: '#FF2D20' }} /> },
  ];

  // Repeat icons more times for a smoother infinite loop across the whole screen
  const marqueeTechs = [...techStack, ...techStack, ...techStack, ...techStack];

  // Optimization: Only use 2 copies for a seamless loop
  const extendedSkills = [...skills, ...skills];

  // We will use CSS for infinite scroll when NOT hovered/dragged,
  // but Framer Motion's drag overwrites the transform! So we can use a hybrid:
  // The outer div runs the CSS marquee animation. The inner div is draggable relative to the outer div!

  return (
    <section id="skills" style={{ overflow: 'hidden', paddingBottom: '80px' }}>
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="about-title">
            <TextReveal text="Keahlian Utama" />
          </h2>
          <p className="contact-subtitle">
            Teknologi dan kerangka kerja yang menjadi senjata utama saya.
          </p>

          <div
            className="marquee-wrapper"
            style={{
              border: 'none',
              background: 'transparent',
              marginTop: '64px',
              padding: '0',
            }}
          >
            {/* The Outer Track automatically pushes left via CSS */}
            <div className="marquee-track">
              {extendedSkills.map((skill, i) => (
                <div
                  key={`${i}-${skill.title}`}
                  className={`skill-card ${i >= skills.length ? 'marquee-item-duplicate' : ''}`}
                >
                  <div
                    className="skill-icon-wrapper"
                    style={{ backgroundColor: skill.color }}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="skill-title">{skill.title}</h3>
                  <p className="skill-desc">
                    {skill.desc}
                  </p>
                  <div className="skill-techs">
                    {skill.techs.map(tech => (
                      <span
                        key={tech}
                        className="tech-badge"
                        style={{
                          background: skill.color,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* New Tech Stack Marquee (Full-Width & Infinite) */}
      <div className="marquee-wrapper-full mt-16">
        <div className="marquee-track-infinite">
          {marqueeTechs.map((tech, i) => (
            <div key={i} className="tech-minimal-badge">
              <div className="tech-minimal-icon">
                {tech.icon}
              </div>
              <span className="tech-minimal-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
