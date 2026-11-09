import { motion } from 'framer-motion';
import { useCollaboration } from '../../context/CollaborationContext';
import { Sparkles } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    }),
};

const NowSection = () => {
    const { stageIndex, buildState } = useCollaboration();
    const isAssembled = Boolean(buildState.isComplete || stageIndex >= 9);
    const nowItems = [
        {
            title: "Data Structures & Algorithms",
            description: "Solving algorithmic challenges on LeetCode and honing problem-solving proficiency with Java and Python.",
            status: "In Progress",
            emoji: "☕",
        },
        {
            title: "Full-Stack Web Engineering",
            description: "Developing responsive web applications with robust Firebase & SQL integrations.",
            status: "Active",
            emoji: "🚀",
        },
    ];

    return (
        <section className="py-32 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-14"
                >
                    <span className="section-label">Current Initiatives</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        What I'm <span className="gradient-text shine-text">currently</span> building
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    {!isAssembled ? (
                        <div className="col-span-1 md:col-span-2 rounded-3xl p-8 border border-dashed border-[#10B981]/35 bg-[#10B981]/5 min-h-[160px] flex flex-col items-center justify-center text-center gap-3">
                            <Sparkles size={22} className="text-[#10B981] animate-pulse" />
                            <span className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                                Frontend Designer · Assembling Current Initiative Cards
                            </span>
                        </div>
                    ) : (
                    nowItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="apple-card rounded-3xl p-7 group"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl p-3 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-color)] shadow-sm">{item.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.status === 'Active' || item.status === 'Live' ? 'bg-emerald-500 animate-live' : 'bg-amber-500 animate-live'}`} />
                                        <span className="text-xs font-mono text-[var(--text-muted)] font-medium">{item.status}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default NowSection;
