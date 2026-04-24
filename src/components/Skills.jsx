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

  // Gunakan 8 set kartu untuk memastikan tidak akan pernah ada ruang kosong bahkan di layar ultrawide
  const extendedSkills = [...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills];

  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // PURE CSS MATH: bypasses DOM measurement entirely, ensuring no race conditions on mobile
        const getCardWidth = () => {
          if (typeof window !== 'undefined') {
            const vw = window.innerWidth;
            const width85vw = vw * 0.85;
            // .skill-card { width: clamp(280px, 85vw, 320px); }
            return Math.max(280, Math.min(width85vw, 320));
          }
          return 320;
        };
        
        const cardWidth = getCardWidth();
        // A single set has skills.length cards. Gap is 24px.
        const singleSetWidth = (cardWidth + 24) * skills.length;
        setContentWidth(singleSetWidth);
        
        // Start in the second set so users can swipe right immediately without seeing empty space
        if (x.get() === 0) {
          x.set(-singleSetWidth);
        }
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [skills.length, x]);

  useAnimationFrame((time, delta) => {
    if (!contentWidth) return;

    let currentX = x.get();

    // Jangan lakukan kalkulasi wrap saat sedang di-drag
    if (isDragging) return;

    // Normal Auto-scroll to the left
    if (!isHovered) {
      currentX -= 0.08 * delta;
    }

    // Keep the position seamlessly operating in the safe middle zone: [-contentWidth * 4, -contentWidth * 2]
    // Menggunakan while loop memastikan bahwa seberapa jauh pun user menggeser (swipe keras),
    // posisinya akan selalu dikoreksi kembali ke zona aman dalam satu frame tanpa terlihat patah.
    while (currentX <= -contentWidth * 4) {
      currentX += contentWidth;
    }
    while (currentX > -contentWidth * 2) {
      currentX -= contentWidth;
    }

    if (currentX !== x.get()) {
      x.set(currentX);
    }
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="marquee-wrapper"
        style={{
          border: 'none',
          background: 'transparent',
          marginTop: '64px',
          padding: '0',
          width: '100%',
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
              paddingRight: '24px', // FIX: accounts for the trailing gap to make math perfect
              width: 'max-content',
              cursor: 'grab',
              touchAction: 'pan-y' // FIX: prevents blocking page scroll on mobile
            }}
            drag="x"
            dragElastic={0}
            dragMomentum={false}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setIsHovered(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setIsHovered(false);
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileTap={{ cursor: 'grabbing' }}
            // Add native touch listeners to ensure scrolling isn't blocked 
            // and hover state doesn't get stuck on mobile Safari/Chrome
            onTouchStart={() => setIsHovered(false)}
          >
            {extendedSkills.map((skill, i) => (
              <div
                key={`${i}-${skill.title}`}
                className="skill-card"
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
      </motion.div>

    </section>
  );
};

export default Skills;
