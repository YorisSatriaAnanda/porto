import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isFirstMount = useRef(true);

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

  return (
    <div className="bg-transparent">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader key="preloader" onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
