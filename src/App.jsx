import Navbar from './components/layout/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import BackgroundEffect from './components/ui/BackgroundEffect';
import CommandPalette from './components/ui/CommandPalette';
import SimulatedCursors from './components/ui/SimulatedCursors';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Achievement from './components/sections/Achievement';
import NowSection from './components/sections/NowSection';
import Contact from './components/sections/Contact';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';
import './index.css';

import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        // Ignore storage read errors
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#050508';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#fbfbfd';
    }
    root.setAttribute('data-theme-resolved', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-[var(--text-primary)] selection:bg-[#6366f1]/25 selection:text-[#6366f1] font-sans">
      <BackgroundEffect />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <SimulatedCursors />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10 w-full overflow-hidden flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Achievement />
        <NowSection />
        <Contact />
      </main>

      {/* Apple-grade Minimal Footer */}
      <footer className="relative z-10 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Identity & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <a href="#home" className="text-base font-bold gradient-text font-[Space_Grotesk]">
                Sanjay Akula
              </a>
              <span className="hidden sm:inline-block text-[var(--border-color)]">•</span>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            {/* Social Profile Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/subbaraoakula79-lang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--glass-bg)] transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
              </a>
              <a
                href="https://www.linkedin.com/in/akula-sanjay-a6477b38a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/10 transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://instagram.com/sanjay._0084"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#EC4899] hover:border-[#EC4899]/40 hover:bg-[#EC4899]/10 transition-all duration-200"
                aria-label="Instagram Profile"
              >
                <Instagram size={15} />
              </a>
              <a
                href="mailto:akulasanjay84@gmail.com"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#6366f1] hover:border-[#6366f1]/40 hover:bg-[#6366f1]/10 transition-all duration-200"
                aria-label="Email Sanjay"
              >
                <Mail size={15} />
              </a>
            </div>

            {/* Back to top button & contact shortcut */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                Get in touch →
              </a>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
                title="Back to Top"
                aria-label="Scroll to Top"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
