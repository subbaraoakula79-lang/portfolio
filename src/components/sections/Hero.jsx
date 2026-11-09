import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import {
    FigmaCollaborationBackdrop,
    FigmaCollaborationOverlay,
    FigmaSelectionFrame,
} from '../ui/FigmaCollaborationLayer';
import { useCollaboration } from '../../context/CollaborationContext';
import { heroStatsData } from '../../data/skillsData';

function useCounter(target, isInView, duration = 1.4) {
    const [count, setCount] = useState(0);
    const numericTarget = parseInt(target);
    useEffect(() => {
        if (!isInView) return;
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = Math.max(0, currentTime - startTime);
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(numericTarget * eased));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, numericTarget, duration]);
    return count;
}

function StatCounter({ value, suffix, label, isInView, colorsApplied }) {
    const count = useCounter(value, isInView, 1.4);
    return (
        <div className="text-center">
            <div
                className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-500 ${
                    colorsApplied ? 'gradient-text shine-text' : 'text-white/80'
                }`}
            >
                {count}{suffix}
            </div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-mono mt-1.5 font-medium">
                {label}
            </div>
        </div>
    );
}

const Hero = () => {
    const { stageIndex, buildState, config, elementStates, assetsPrecached } = useCollaboration();

    const headlineWords = ['I', 'build', 'things', 'that', 'matter.'];
    const stats = heroStatsData;
    const shouldAnimateStats = buildState.showStats;

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-32 pb-24 overflow-hidden"
            data-testid="hero-section"
            data-intro-stage={stageIndex}
            data-intro-phase={buildState.phase}
            data-assets-precached={assetsPrecached ? 'true' : 'false'}
        >
            {/* Full-Screen Pure Black Opening Canvas Backdrop (behind portfolio z-10 content on Desktop >= 1024px) */}
            <FigmaCollaborationBackdrop buildState={buildState} config={config} />

            {/* Apple-style subtle ambient glow orbs — ignited when Color Designer applies brand palette in Stage 4 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: buildState.colorsApplied ? 0.35 : 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full pointer-events-none blur-3xl animate-ambient z-[6]"
                style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.12) 45%, transparent 70%)' }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: buildState.colorsApplied ? 0.25 : 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full pointer-events-none blur-3xl z-[6]"
                style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)' }}
            />

            {/* Simulated 10-Cursor Figma Collaboration Overlay & Interaction Lock */}
            <FigmaCollaborationOverlay
                stageIndex={stageIndex}
                buildState={buildState}
                config={config}
            />

            {/* Main Hero Design Canvas -> Smoothly Transforms Into Live Portfolio Hero */}
            <motion.div
                animate={{
                    scale: buildState.canvasScale,
                    opacity: stageIndex === 0 ? 0 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl w-full mx-auto text-center relative z-10"
                style={{ contain: 'layout style' }}
                data-testid="hero-content-container"
                data-hero-complete={buildState.isComplete ? 'true' : 'false'}
            >
                <FigmaSelectionFrame
                    {...(elementStates.heroFrame || {})}
                    className="w-full py-2"
                    testId="hero-main-frame"
                >
                    {/* Subtle Figma Outer Canvas Outline during Stages 1..4 */}
                    {buildState.showHeroFrame && !elementStates.heroFrame && (
                        <div
                            className="pointer-events-none absolute -inset-3 rounded-xl border border-dashed border-white/10 transition-opacity duration-500"
                            aria-hidden="true"
                        />
                    )}

                    {/* Profile + Status Badge (Constructed in Stage 2) */}
                    <div className="flex justify-center mb-8 min-h-[56px]">
                        <FigmaSelectionFrame
                            {...(elementStates.profile || {})}
                            className="inline-block"
                            testId="frame-profile"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -12, scale: 0.92 }}
                                animate={
                                    buildState.showProfile
                                        ? { opacity: 1, y: 0, scale: 1 }
                                        : { opacity: 0, y: -12, scale: 0.92 }
                                }
                                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center justify-center gap-4 min-h-[56px]"
                            >
                                <div className="relative group w-14 h-14 min-w-[56px] min-h-[56px] aspect-square shrink-0">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                        className="absolute -inset-[3px] rounded-full transition-opacity duration-500"
                                        style={{
                                            opacity: buildState.colorsApplied ? 0.85 : 0.3,
                                            background: buildState.colorsApplied
                                                ? 'conic-gradient(from 0deg, #6366f1, #8B5CF6, #c084fc, #6366f1)'
                                                : 'conic-gradient(from 0deg, #52525b, #a1a1aa, #52525b)',
                                            padding: '2px',
                                        }}
                                    />
                                    <img
                                        src="/profile.jpg"
                                        alt="Sanjay Akula"
                                        width="56"
                                        height="56"
                                        loading="eager"
                                        decoding="sync"
                                        fetchPriority="high"
                                        className="w-14 h-14 min-w-[56px] min-h-[56px] aspect-square rounded-full object-cover relative z-10 ring-2 ring-[var(--bg-primary)] shadow-md"
                                    />
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={buildState.showProfile ? { scale: 1 } : { scale: 0 }}
                                        transition={{ delay: 0.15, type: 'spring', stiffness: 500 }}
                                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[var(--bg-primary)] animate-live z-20 shadow-sm"
                                        title="Available for opportunities"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">Sanjay Akula</p>
                                    <p className="text-xs text-[var(--text-muted)] font-mono">Available for opportunities</p>
                                </div>
                            </motion.div>
                        </FigmaSelectionFrame>
                    </div>

                    {/* Bold Headline (Constructed in Stages 2–3, Colored in Stage 4) */}
                    <div className="mb-8">
                        <FigmaSelectionFrame
                            {...(elementStates.headline || {})}
                            className="inline-block"
                            testId="frame-headline"
                        >
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.04] tracking-tight">
                                {headlineWords.map((word, i) => {
                                    const isWordInserted = i < buildState.headlineWordsVisibleCount;
                                    const isAccentWord = word === 'things' || word === 'matter.';
                                    return (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={
                                                isWordInserted
                                                    ? { opacity: 1, y: 0 }
                                                    : { opacity: 0, y: 20 }
                                            }
                                            transition={{
                                                delay: buildState.isComplete ? 0 : i * 0.06,
                                                duration: 0.45,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className={`inline-block mr-[0.25em] transition-colors duration-500 ${
                                                isAccentWord
                                                    ? buildState.colorsApplied
                                                        ? 'gradient-text shine-text'
                                                        : 'text-white/90'
                                                    : 'text-[var(--text-primary)]'
                                            }`}
                                        >
                                            {word}
                                        </motion.span>
                                    );
                                })}
                                {stageIndex === 5 && buildState.headlineWordsVisibleCount < 5 && (
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.6 }}
                                        className="inline-block w-1.5 h-12 md:h-16 bg-[#F59E0B] align-middle ml-1 shadow-sm rounded-sm"
                                    />
                                )}
                            </h1>
                        </FigmaSelectionFrame>
                    </div>

                    {/* Sub-headline (Constructed in Stage 3) */}
                    <div className="mb-12">
                        <FigmaSelectionFrame
                            {...(elementStates.subheadline || {})}
                            className="inline-block max-w-2xl mx-auto"
                            testId="frame-subheadline"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={
                                    buildState.showSubheadline
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 16 }
                                }
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-normal"
                            >
                                Developer · Designer · Problem Solver.{' '}
                                <br className="hidden sm:block" />
                                BSc IT student crafting focused, elegant, and impactful digital experiences.
                            </motion.p>
                        </FigmaSelectionFrame>
                    </div>

                    {/* CTA Buttons (Constructed in Stage 3, Colored in Stage 4) */}
                    <div className="flex justify-center mb-16">
                        <FigmaSelectionFrame
                            {...(elementStates.cta || {})}
                            className="inline-block max-w-full"
                            testId="frame-cta"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                                animate={
                                    buildState.showCta
                                        ? { opacity: 1, y: 0, scale: 1 }
                                        : { opacity: 0, y: 16, scale: 0.96 }
                                }
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-full"
                            >
                                <MagneticButton
                                    as="a"
                                    href="#projects"
                                    className={`btn-primary group h-12 px-5 sm:px-7 whitespace-nowrap justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 active:scale-95 transition-all duration-500 ${
                                        buildState.colorsApplied
                                            ? ''
                                            : '!bg-none !bg-white/10 !border-white/25 !shadow-none'
                                    }`}
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
                        </FigmaSelectionFrame>
                    </div>

                    {/* Stats (Constructed in Stage 4) */}
                    <div className="flex justify-center">
                        <FigmaSelectionFrame
                            {...(elementStates.stats || {})}
                            className="inline-block"
                            testId="frame-stats"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={
                                    buildState.showStats
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 16 }
                                }
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center justify-center gap-8 sm:gap-16 pt-4"
                            >
                                {stats.map((stat, i) => (
                                    <div key={stat.label} className="relative">
                                        {i > 0 && (
                                            <div className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-px h-10 bg-[var(--border-color)]" />
                                        )}
                                        <StatCounter
                                            {...stat}
                                            isInView={shouldAnimateStats}
                                            colorsApplied={buildState.colorsApplied}
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </FigmaSelectionFrame>
                    </div>
                </FigmaSelectionFrame>
            </motion.div>

            {/* Scroll Indicator (Revealed in Stage 5+) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={buildState.showScrollIndicator ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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
