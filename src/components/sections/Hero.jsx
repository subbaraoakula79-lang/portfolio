import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Eye, ArrowRight, MessageCircle } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

function useCounter(target, isInView, duration = 1.8) {
    const [count, setCount] = useState(0);
    const numericTarget = parseInt(target);
    useEffect(() => {
        if (!isInView) return;
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(numericTarget * eased));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, numericTarget, duration]);
    return count;
}

const roles = ['Software Developer', 'Web Developer', 'Java & Python Developer', 'Problem Solver'];

const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-50px' });
    const [roleIdx, setRoleIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2800);
        return () => clearInterval(t);
    }, []);

    const headlineWords = ['I', 'build', 'things', 'that', 'matter.'];
    const wordVariants = {
        hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
        visible: (i) => ({
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { delay: 0.3 + i * 0.13, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 28 },
        visible: (delay) => ({
            opacity: 1, y: 0,
            transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
    };

    const stats = [
        { value: '4', suffix: '+', label: 'Projects' },
        { value: '7', suffix: '+', label: 'Skills' },
        { value: '1', suffix: '', label: 'Championship' },
    ];

    const StatCounter = ({ value, suffix, label }) => {
        const count = useCounter(value, statsInView, 1.8);
        return (
            <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text shine-text">
                    {count}{suffix}
                </div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-mono mt-1">{label}</div>
            </div>
        );
    };

    return (
        <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-28 pb-20">
            {/* Ambient orbs */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Profile badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.4, filter: 'blur(12px)' }}
                    animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                    transition={{ delay: 0.1, duration: 0.85, type: 'spring', stiffness: 180, damping: 18 }}
                    className="flex items-center justify-center gap-4 mb-12"
                >
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                            className="absolute -inset-[3px] rounded-full"
                            style={{ background: 'conic-gradient(from 0deg, #6366f1, #8B5CF6, #a78bfa, #6366f1)', padding: '2px' }}
                        />
                        <img
                            src="/profile.jpg"
                            alt="Sanjay Akula"
                            loading="eager"
                            className="w-14 h-14 rounded-full object-cover relative z-10 ring-2 ring-[var(--bg-primary)]"
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.9, type: 'spring', stiffness: 500 }}
                            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[var(--bg-primary)] animate-live z-20"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Sanjay Akula</p>
                        <p className="text-xs text-[var(--text-muted)] font-mono">Available for opportunities</p>
                    </div>
                </motion.div>

                {/* Animated role chip */}
                <motion.div
                    custom={0.4}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex justify-center mb-7"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-sm text-xs font-mono text-[var(--text-secondary)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-live" />
                        <motion.span
                            key={roleIdx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}
                        >
                            {roles[roleIdx]}
                        </motion.span>
                    </div>
                </motion.div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 tracking-tight">
                    {headlineWords.map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className={`inline-block mr-[0.28em] ${word === 'things' || word === 'matter.' ? 'gradient-text shine-text' : 'text-[var(--text-primary)]'}`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                {/* Sub-headline */}
                <motion.p
                    custom={1.2}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Developer · Designer · Problem Solver.
                    <br className="hidden sm:block" />
                    BSc IT student building focused, elegant, and impactful digital products.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    custom={1.5}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-wrap items-center justify-center gap-4 mb-16"
                >
                    <MagneticButton as="a" href="#projects" className="btn-primary group">
                        View Projects
                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                    </MagneticButton>

                    <MagneticButton
                        as="a"
                        href="/resume.png"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary group"
                    >
                        <Eye size={16} className="group-hover:scale-110 transition-transform" />
                        View Resume
                    </MagneticButton>

                    <MagneticButton as="a" href="#contact" className="btn-outline group">
                        <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                        Contact Me
                    </MagneticButton>
                </motion.div>

                {/* Stats */}
                <motion.div
                    ref={statsRef}
                    custom={1.8}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex items-center justify-center gap-10 sm:gap-20"
                >
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="relative">
                            {i > 0 && (
                                <div className="absolute -left-5 sm:-left-10 top-1/2 -translate-y-1/2 w-px h-8 bg-[var(--border-color)]" />
                            )}
                            <StatCounter {...stat} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-mono">Scroll</span>
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
