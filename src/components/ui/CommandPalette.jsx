import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const commands = [
        { label: 'Home', section: '#home', icon: '🏠' },
        { label: 'About Me', section: '#about', icon: '👤' },
        { label: 'Projects', section: '#projects', icon: '🚀' },
        { label: 'Achievements', section: '#achievements', icon: '🏆' },
        { label: 'Contact', section: '#contact', icon: '✉️' },
        { label: 'Download Resume', action: 'resume', icon: '📄' },
        { label: 'GitHub', action: 'https://github.com/', icon: '💻', external: true },
        { label: 'LinkedIn', action: 'https://www.linkedin.com/in/akula-sanjay-a6477b38a', icon: '🔗', external: true },
    ];

    const filtered = commands.filter(c =>
        c.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = useCallback((cmd) => {
        setIsOpen(false);
        setSearch('');

        if (cmd.section) {
            document.querySelector(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
        } else if (cmd.action === 'resume') {
            fetch('/resume.png')
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Sanjay_Resume.png';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                });
        } else if (cmd.external) {
            window.open(cmd.action, '_blank');
        }
    }, []);

    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setSearch('');
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
                setSearch('');
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => { setIsOpen(false); setSearch(''); }}
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl"
                        style={{ background: 'var(--bg-primary)' }}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)]">
                            <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none text-sm"
                            />
                            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border-color)] text-[var(--text-muted)]">ESC</kbd>
                        </div>

                        {/* Results */}
                        <div className="py-2 max-h-[300px] overflow-y-auto">
                            {filtered.length === 0 && (
                                <p className="px-5 py-8 text-center text-[var(--text-muted)] text-sm">No results found.</p>
                            )}
                            {filtered.map((cmd, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(cmd)}
                                    className="w-full flex items-center gap-3 px-5 py-3 text-left text-sm text-[var(--text-secondary)] hover:bg-[var(--gradient-subtle)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    <span className="text-base">{cmd.icon}</span>
                                    <span className="font-medium">{cmd.label}</span>
                                    {cmd.external && (
                                        <svg className="w-3 h-3 ml-auto text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-[var(--border-color)] flex items-center gap-4 text-[10px] font-mono text-[var(--text-muted)]">
                            <span>↑↓ Navigate</span>
                            <span>↵ Select</span>
                            <span>esc Close</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
