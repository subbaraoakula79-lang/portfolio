import { motion } from 'framer-motion';
import { Medal, Trophy } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const Achievement = () => {
    return (
        <section id="achievements" className="py-28 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16"
                >
                    <span className="section-label">Milestones</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Beyond the <span className="gradient-text shine-text">code</span>
                    </h2>
                </motion.div>

                {/* Achievement Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="card rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                        {/* Subtle gradient accent */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: 'linear-gradient(to right, transparent, #F59E0B, transparent)' }}
                        />

                        <div className="flex flex-col md:flex-row items-start gap-8">
                            {/* Medal Visual */}
                            <div className="flex-shrink-0">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                                    style={{
                                        background: 'linear-gradient(135deg, #F59E0B20, #D9770620)',
                                        border: '1px solid rgba(245, 158, 11, 0.2)',
                                    }}
                                >
                                    <Medal size={36} className="text-amber-500" />
                                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                        <Trophy size={12} className="text-white" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2 inline-block">
                                    Sports Achievement
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 leading-tight">
                                    Inter University Archery Championship
                                </h3>

                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 font-semibold text-sm mb-5">
                                    <Medal size={14} />
                                    Bronze Medal — 3rd Place
                                </div>

                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Demonstrated exceptional focus, patience, and precision under competitive pressure —
                                    traits that translate directly into disciplined problem-solving and technical excellence.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Achievement;
