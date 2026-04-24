import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => {
    // Check if user has already seen the preloader in this session
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('yoris_porto_loaded') === 'true';
    }
    return false;
  });

  const handleLoadComplete = () => {
    setIsLoaded(true);
    sessionStorage.setItem('yoris_porto_loaded', 'true');
  };

  const isFirstMount = useRef(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggle = () => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    if (isFirstMount.current) {
      isFirstMount.current = false;
      toggle();
      return;
    }

    if (!document.startViewTransition) {
      toggle();
    } else {
      document.startViewTransition(toggle);
    }
  }, [darkMode]);

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Disable smooth touch to make mobile feel more native and responsive
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-transparent">
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />
      
      {/* Premium Texture Overlay */}
      <div className="grain-overlay" />

      <CustomCursor />
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader key="preloader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main>
              <Hero />
              <About />
              <Skills />
              <Certifications />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
