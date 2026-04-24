import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!imageRef.current || isTouchDevice) return;
    const rect = imageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    mouseX.set((clientX / width) - 0.5);
    mouseY.set((clientY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Left: Image with Parallax & Tilt effect */}
          <motion.div
            style={{ y: scrollY, perspective: 1000 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
            >
              <img
                src="/about.png"
                alt="About Me"
                className="about-img"
                style={{ transform: "translateZ(30px)" }}
              />
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="about-title"
            >
              Tentang Saya
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="about-text"
            >
              <p style={{ marginBottom: '16px', lineHeight: '1.8' }}>
                Siswa SMK RPL yang punya rasa ingin tahu tinggi. Saat ini sedang aktif mengeksplorasi berbagai teknologi web modern dan selalu antusias dalam membangun produk digital yang interaktif dan bermanfaat.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="about-meta"
            >
              <div>
                <p className="meta-label">Pendidikan</p>
                <h4 className="meta-value">SMK</h4>
                <p className="meta-sub">Rekayasa Perangkat Lunak</p>
              </div>
              <div>
                <p className="meta-label">Lokasi</p>
                <h4 className="meta-value">Bogor, Indonesia</h4>
                <p className="meta-sub">Waktu Indonesia Barat</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
