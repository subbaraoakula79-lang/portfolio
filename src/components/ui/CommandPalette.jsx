import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const commands = [
        { label: 'Home', section: '#home', icon: '🏠' },
        { label: 'About & Journey', section: '#about', icon: '👤' },
        { label: 'Selected Work', section: '#projects', icon: '🚀' },
        { label: 'Milestones', section: '#achievements', icon: '🏆' },
        { label: 'Contact', section: '#contact', icon: '✉️' },
        { label: 'GitHub Profile', action: 'https://github.com/subbaraoakula79-lang', icon: '💻', external: true },
        { label: 'LinkedIn Profile', action: 'https://www.linkedin.com/in/akula-sanjay-a6477b38a', icon: '🔗', external: true },
    ];

    const filtered = commands.filter(c =>
        c.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = useCallback((cmd) => {
        setIsOpen(false);
        setSearch('');

        if (cmd.section) {
            document.querySelector(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
        } else if (cmd.external) {
            window.open(cmd.action, '_blank', 'noopener,noreferrer');
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
                    className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4"
                >
                    {/* Apple-style backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/55 backdrop-blur-md"
                        onClick={() => { setIsOpen(false); setSearch(''); }}
                    />

                    {/* Palette modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -12 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl glass-panel"
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
                                placeholder="Type a command or jump to section..."
                                className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none text-sm font-medium"
                            />
                            <kbd className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-md border border-[var(--border-color)] text-[var(--text-muted)] bg-[var(--glass-bg)]">ESC</kbd>
                        </div>

                        {/* Results */}
                        <div className="py-2 max-h-[300px] overflow-y-auto">
                            {filtered.length === 0 && (
                                <p className="px-5 py-8 text-center text-[var(--text-muted)] text-sm">No commands found.</p>
                            )}
                            {filtered.map((cmd, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(cmd)}
                                    className="w-full flex items-center gap-3 px-5 py-3 text-left text-sm text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    <span className="text-base">{cmd.icon}</span>
                                    <span className="font-medium">{cmd.label}</span>
                                    {cmd.external && (
                                        <svg className="w-3.5 h-3.5 ml-auto text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] bg-[var(--glass-bg)]">
                            <span className="flex items-center gap-2">
                                <span>↑↓ Navigate</span>
                                <span>•</span>
                                <span>↵ Select</span>
                            </span>
                            <span>esc Close</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
