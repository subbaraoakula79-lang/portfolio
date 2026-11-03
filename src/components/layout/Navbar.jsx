import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 25);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section detection using IntersectionObserver
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
        { name: 'Milestones', href: '#achievements', id: 'achievements' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    return (
        <header className="fixed top-0 w-full z-50 flex justify-center px-4 py-4 pointer-events-none">
            <motion.nav
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-400 ${
                    isScrolled
                        ? 'nav-glass shadow-lg border border-[var(--border-color)]'
                        : 'bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--border-color)]'
                }`}
                aria-label="Main Navigation"
            >
                {/* Brand Monogram */}
                <a
                    href="#home"
                    className="px-3.5 py-1.5 rounded-full hover:bg-[var(--glass-bg)] transition-colors duration-200"
                    aria-label="Home"
                >
                    <span className="text-base font-bold gradient-text font-[Space_Grotesk] tracking-tight">S.</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                                activeSection === link.id
                                    ? 'text-[var(--text-primary)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            {activeSection === link.id && (
                                <motion.span
                                    layoutId="apple-nav-pill"
                                    className="absolute inset-0 rounded-full bg-[var(--glass-bg)] border border-[var(--border-color)] shadow-sm"
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10">{link.name}</span>
                        </a>
                    ))}

                    <div className="w-px h-4 bg-[var(--border-color)] mx-1" />

                    {/* Cmd K shortcut */}
                    <button
                        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
                        className="px-2.5 py-1 text-[11px] font-mono text-[var(--text-muted)] rounded-full border border-[var(--border-color)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)] transition-all bg-[var(--glass-bg)]"
                        title="Search or Jump to Section"
                        aria-label="Search Palette"
                    >
                        ⌘K
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
                        aria-label="Toggle Theme"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-1">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </button>
                    <button
                        className="p-2 rounded-full text-[var(--text-primary)]"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOpen ? 'x' : 'menu'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {isOpen ? <X size={18} /> : <Menu size={18} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-20 left-4 right-4 md:hidden glass-panel rounded-3xl overflow-hidden z-50 border border-[var(--border-color)] shadow-2xl p-3"
                    >
                        <div className="space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className={`block px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${
                                        activeSection === link.id
                                            ? 'text-[#6366f1] bg-[var(--glass-bg)] shadow-sm'
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
        </header>
    );
};

export default Navbar;
