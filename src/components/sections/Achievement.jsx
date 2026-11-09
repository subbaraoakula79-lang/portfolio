import { motion } from 'framer-motion';
import { useCollaboration } from '../../context/CollaborationContext';
import { Medal, Trophy, Award } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    }),
};

const Achievement = () => {
    const { stageIndex, buildState } = useCollaboration();
    const isAssembled = Boolean(buildState.isComplete || stageIndex >= 9);
    return (
        <section id="achievements" className="py-32 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-16"
                >
                    <span className="section-label">Milestones</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        Beyond the <span className="gradient-text shine-text">code</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg leading-relaxed">
                        Excellence in athletic competition that reflects disciplined concentration and mental composure.
                    </p>
                </motion.div>

                {/* Achievement Card */}
                {!isAssembled ? (
                    <div className="max-w-3xl mx-auto rounded-3xl p-10 border border-dashed border-[#14B8A6]/35 bg-[#14B8A6]/5 min-h-[220px] flex flex-col items-center justify-center text-center gap-3">
                        <Trophy size={26} className="text-[#14B8A6] animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-widest text-[#14B8A6] font-semibold">
                            Visual Designer · Framing Athletic Milestone Card
                        </span>
                    </div>
                ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 35 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="apple-card rounded-3xl p-8 sm:p-12 relative overflow-hidden group">
                        {/* Specular line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)' }}
                        />

                        <div className="flex flex-col md:flex-row items-start gap-8">
                            {/* Medal Visual */}
                            <div className="flex-shrink-0">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="w-20 h-20 rounded-3xl flex items-center justify-center relative shadow-md"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(217, 119, 6, 0.08))',
                                        border: '1px solid rgba(245, 158, 11, 0.25)',
                                    }}
                                >
                                    <Medal size={38} className="text-amber-500" />
                                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-sm">
                                        <Trophy size={13} className="text-white" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2 inline-flex items-center gap-1.5 font-semibold">
                                    <Award size={13} />
                                    Athletic Milestone
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 leading-tight tracking-tight">
                                    Inter-University Archery Championship
                                </h3>

                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 font-semibold text-xs sm:text-sm mb-5 shadow-sm">
                                    <Medal size={15} />
                                    Bronze Medalist — 3rd Place
                                </div>

                                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                                    Demonstrated exceptional focus, patience, and precision under competitive pressure — traits that translate directly into disciplined engineering, methodical debugging, and sustained technical excellence.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
                )}
            </div>
        </section>
    );
};

export default Achievement;
