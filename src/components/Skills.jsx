import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Code2, Palette, Terminal, Cpu } from 'lucide-react';
import TextReveal from './TextReveal';

const Skills = () => {
  const skills = [
    {
      title: 'Frontend Development',
      desc: 'Menguasai konsep dasar dan implementasi praktis dalam bidang ini.',
      icon: <Code2 className="text-blue-500" size={28} />,
      color: 'rgba(59, 130, 246, 0.1)',
    },
    {
      title: 'UI/UX Design',
      desc: 'Menguasai konsep dasar dan implementasi praktis dalam bidang ini.',
      icon: <Palette className="text-purple-500" size={28} />,
      color: 'rgba(168, 85, 247, 0.1)',
    },
    {
      title: 'Backend Logic',
      desc: 'Menguasai konsep dasar dan implementasi praktis dalam bidang ini.',
      icon: <Terminal className="text-green-500" size={28} />,
      color: 'rgba(34, 197, 94, 0.1)',
    },
    {
      title: 'Hardware & IoT',
      desc: 'Menguasai konsep dasar dan implementasi praktis dalam bidang ini.',
      icon: <Cpu className="text-orange-500" size={28} />,
      color: 'rgba(249, 115, 22, 0.1)',
    },
  ];

  // We duplicate the array to allow for a long drag and loop effect.
  // 6 copies gives us a massive track to drag across.
  const extendedSkills = [...skills, ...skills, ...skills, ...skills, ...skills, ...skills];

  const trackRef = useRef(null);

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
            <div className="marquee-track" style={{ animationDuration: '60s', alignItems: 'center' }}>
              
              {/* The Inner Track gives the user manual drag control relative to the auto-scroll */}
              <motion.div 
                className="draggable-track"
                drag="x"
                dragConstraints={{ left: -3000, right: 1000 }}
                dragElastic={0.1}
                style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  paddingRight: '24px', 
                  cursor: 'grab' 
                }}
                whileTap={{ cursor: 'grabbing' }}
              >
                {extendedSkills.map((skill, i) => (
                  <div
                    key={`${i}-${skill.title}`}
                    className="skill-card text-left"
                    style={{ 
                      width: '300px', 
                      flexShrink: 0, 
                      padding: '32px', 
                      textAlign: 'left',
                      userSelect: 'none'
                    }}
                  >
                    <div 
                      className="skill-icon-wrapper"
                      style={{ backgroundColor: skill.color, marginBottom: '24px' }}
                    >
                      {skill.icon}
                    </div>
                    <h3 className="skill-title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{skill.title}</h3>
                    <p className="skill-desc" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {skill.desc}
                    </p>
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
