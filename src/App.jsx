import Navbar from './components/layout/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import BackgroundEffect from './components/ui/BackgroundEffect';
import CommandPalette from './components/ui/CommandPalette';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Achievement from './components/sections/Achievement';
import NowSection from './components/sections/NowSection';
import Contact from './components/sections/Contact';
import './index.css';

import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="relative min-h-screen text-[var(--text-primary)] selection:bg-primary/20 selection:text-primary font-sans">
      <BackgroundEffect />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10 w-full overflow-hidden flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Achievement />
        <NowSection />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)] font-mono">
            © {new Date().getFullYear()} Sanjay Akula
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>Built with</span>
            <span className="gradient-text font-semibold">React</span>
            <span>·</span>
            <span className="gradient-text font-semibold">Framer Motion</span>
            <span>·</span>
            <span className="gradient-text font-semibold">Tailwind</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Press <kbd className="font-mono px-1.5 py-0.5 mx-0.5 rounded border border-[var(--border-color)] text-[10px]">⌘K</kbd> to navigate
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
