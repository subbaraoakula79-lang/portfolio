import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section tracker
    useEffect(() => {
        const sections = ['home', 'about', 'projects', 'achievements', 'contact'];
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Achievements', href: '#achievements', id: 'achievements' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 flex justify-center px-4 py-4">
            <motion.div
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className={`flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-500 ${isScrolled ? 'nav-glass shadow-lg' : 'bg-transparent'}`}
            >
                {/* Logo */}
                <a href="#home" className="px-3 py-2 rounded-xl hover:bg-[var(--glass-bg)] transition-colors duration-200">
                    <span className="text-lg font-bold gradient-text font-[Space_Grotesk]">S.</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`relative px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${activeSection === link.id
                                ? 'text-[var(--text-primary)]'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]'
                                }`}
                        >
                            {activeSection === link.id && (
                                <motion.span
                                    layoutId="nav-indicator"
                                    className="absolute inset-0 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-color)]"
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{link.name}</span>
                        </a>
                    ))}

                    <div className="w-px h-5 bg-[var(--border-color)] mx-1" />

                    {/* Cmd K */}
                    <button
                        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
                        className="px-2.5 py-1.5 text-[11px] font-mono text-[var(--text-muted)] rounded-lg border border-[var(--border-color)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)] transition-all"
                        aria-label="Open command palette"
                    >
                        ⌘K
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
                        aria-label="Toggle Theme"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-1">
                    <button onClick={toggleTheme} className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button className="p-2 rounded-xl text-[var(--text-primary)]" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                        <AnimatePresence mode="wait">
                            <motion.div key={isOpen ? 'x' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                {isOpen ? <X size={20} /> : <Menu size={20} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.97 }}
                        transition={{ duration: 0.22 }}
                        className="fixed top-20 left-4 right-4 md:hidden glass-panel rounded-2xl overflow-hidden z-50"
                    >
                        <div className="py-3 px-2">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeSection === link.id
                                        ? 'text-[#6366f1] bg-[var(--glass-bg)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]'
                                        }`}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
