import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Code2, Palette, Terminal, Cpu, Cloud } from 'lucide-react';
import {
  SiGo, SiLaravel, SiReact, SiNestjs, SiInertia,
  SiTailwindcss, SiMongodb, SiJavascript, SiTypescript,
  SiPostgresql, SiMysql, SiDocker, SiGithub, SiPhp,
  SiVercel, SiNodedotjs, SiBootstrap
} from 'react-icons/si';
import TextReveal from './TextReveal';

const Skills = () => {
  const skills = [
    {
      title: 'Frontend Development',
      desc: 'Membangun antarmuka web yang responsif dan interaktif menggunakan teknologi modern.',
      icon: <Code2 className="text-blue-500" size={28} />,
      color: 'rgba(59, 130, 246, 0.1)',
      techs: ['JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap', 'HTML', 'CSS', 'Vite']
    },
    {
      title: 'UI/UX Design',
      desc: 'Merancang pengalaman pengguna yang intuitif dengan estetika visual yang bersih.',
      icon: <Palette className="text-purple-500" size={28} />,
      color: 'rgba(168, 85, 247, 0.1)',
      techs: ['Figma', 'Canva']
    },
    {
      title: 'Backend Development',
      desc: 'Membangun logika server dan manajemen database yang efisien dan aman.',
      icon: <Terminal className="text-green-500" size={28} />,
      color: 'rgba(34, 197, 94, 0.1)',
      techs: ['Node.js', 'Laravel', 'MySQL', 'MongoDB']
    },
    {
      title: 'Tools & Deployment',
      desc: 'Mengelola versi kode dan deployment aplikasi ke cloud.',
      icon: <Cloud className="text-gray-500" size={28} />,
      color: 'rgba(107, 114, 128, 0.1)',
      techs: ['Vercel', 'Git', 'GitHub']
    }
  ];

  // Optimization: Use 4 copies to ensure enough width for seamless wrapping
  const extendedSkills = [...skills, ...skills, ...skills, ...skills];

  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // We have 4 identical sets. The width of one set is scrollWidth / 4.
        setContentWidth(containerRef.current.scrollWidth / 4);
      }
    };
    
    updateWidth();
    // Delay slightly to ensure fonts/icons are fully rendered
    setTimeout(updateWidth, 100); 
    
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useAnimationFrame((time, delta) => {
    if (!contentWidth) return;

    let currentX = x.get();

    // Auto-scroll to the left
    if (!isHovered) {
      currentX -= 0.05 * delta;
    }

    // Seamless modulo wrap between [-contentWidth, 0]
    if (currentX <= -contentWidth) {
      currentX = currentX % contentWidth;
    } else if (currentX > 0) {
      currentX = (currentX % contentWidth) - contentWidth;
    }

    x.set(currentX);
  });

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
            {/* Framer Motion Infinite Drag & Scroll Track */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <motion.div
                ref={containerRef}
                style={{ 
                  x, 
                  display: 'flex', 
                  gap: '24px', 
                  width: 'max-content', 
                  cursor: 'grab' 
                }}
                drag="x"
                dragElastic={0}
                dragMomentum={true}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onDragStart={() => setIsHovered(true)}
                onDragEnd={() => setIsHovered(false)}
                whileTap={{ cursor: 'grabbing' }}
              >
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
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Skills;
