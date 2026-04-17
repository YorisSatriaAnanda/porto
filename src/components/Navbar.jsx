import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`nav-fixed ${isScrolled ? 'nav-scrolled' : 'nav-default'}`}>
      <div className="container nav-container">
        <div className="nav-glass-wrapper">
          {/* Logo */}
          <a href="#" className="logo">
            PORTFOLIO<span>.</span>
          </a>

          {/* Desktop Links (Centered) */}
          <div className="nav-links desktop-only mx-auto">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Hire Me Button & Mobile Toggle */}
          <div className="desktop-only nav-action" style={{ gap: '16px', alignItems: 'center' }}>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="glass"
              style={{ padding: '8px', borderRadius: '50%' }}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="#contact" className="btn btn-primary px-lg">
              Hire Me
            </a>
          </div>
          
          <div className="mobile-only">
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="glass"
                style={{ padding: '8px', borderRadius: '50%' }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                className="nav-mobile-toggle glass"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="glass mobile-menu-content">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary btn-full mt-4">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
