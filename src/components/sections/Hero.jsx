import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { heroStatsData } from '../../data/skillsData';

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

const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

    const headlineWords = ['I', 'build', 'things', 'that', 'matter.'];
    const wordVariants = {
        hidden: { opacity: 0, y: 44, filter: 'blur(10px)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { delay: 0.28 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        }),
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 26 },
        visible: (delay) => ({
            opacity: 1,
            y: 0,
            transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        }),
    };

    const stats = heroStatsData;

    const StatCounter = ({ value, suffix, label }) => {
        const count = useCounter(value, statsInView, 1.8);
        return (
            <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight gradient-text shine-text">
                    {count}{suffix}
                </div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-mono mt-1.5 font-medium">
                    {label}
                </div>
            </div>
        );
    };

    return (
        <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-32 pb-24 overflow-hidden">
            {/* Apple-style subtle ambient glow orbs */}
            <div
                className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full pointer-events-none opacity-40 dark:opacity-25 blur-3xl animate-ambient"
                style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.12) 45%, transparent 70%)' }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-30 dark:opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)' }}
            />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Profile + Status Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, filter: 'blur(14px)' }}
                    animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                    transition={{ delay: 0.1, duration: 0.85, type: 'spring', stiffness: 190, damping: 20 }}
                    className="flex items-center justify-center gap-4 mb-8"
                >
                    <div className="relative group">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                            className="absolute -inset-[3px] rounded-full opacity-80"
                            style={{ background: 'conic-gradient(from 0deg, #6366f1, #8B5CF6, #c084fc, #6366f1)', padding: '2px' }}
                        />
                        <img
                            src="/profile.jpg"
                            alt="Sanjay Akula"
                            loading="eager"
                            className="w-14 h-14 rounded-full object-cover relative z-10 ring-2 ring-[var(--bg-primary)] shadow-md"
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.9, type: 'spring', stiffness: 500 }}
                            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[var(--bg-primary)] animate-live z-20 shadow-sm"
                            title="Available for opportunities"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">Sanjay Akula</p>
                        <p className="text-xs text-[var(--text-muted)] font-mono">Available for opportunities</p>
                    </div>
                </motion.div>

                {/* Bold Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.04] mb-8 tracking-tight">
                    {headlineWords.map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className={`inline-block mr-[0.25em] ${word === 'things' || word === 'matter.' ? 'gradient-text shine-text' : 'text-[var(--text-primary)]'}`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                {/* Sub-headline */}
                <motion.p
                    custom={1.1}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
                >
                    Developer · Designer · Problem Solver.
                    <br className="hidden sm:block" />
                    BSc IT student crafting focused, elegant, and impactful digital experiences.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    custom={1.4}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16 max-w-full"
                >
                    <MagneticButton
                        as="a"
                        href="#projects"
                        className="btn-primary group h-12 px-5 sm:px-7 whitespace-nowrap justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 active:scale-95"
                    >
                        <span>View Projects</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                    </MagneticButton>

                    <MagneticButton
                        as="a"
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary group h-12 px-5 sm:px-7 whitespace-nowrap justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 active:scale-95"
                    >
                        <FileText size={16} className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                        <span>View Resume</span>
                    </MagneticButton>
                </motion.div>

                {/* Stats */}
                <motion.div
                    ref={statsRef}
                    custom={1.7}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex items-center justify-center gap-8 sm:gap-16 pt-4"
                >
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="relative">
                            {i > 0 && (
                                <div className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-px h-10 bg-[var(--border-color)]" />
                            )}
                            <StatCounter {...stat} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.22em] font-mono font-medium">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
