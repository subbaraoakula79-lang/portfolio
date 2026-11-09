import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    }),
};

const NowSection = () => {
    const nowItems = [
        {
            title: "Data Structures & Algorithms",
            description: "Solving algorithmic challenges on LeetCode and honing problem-solving proficiency with Java and Python.",
            status: "In Progress",
            emoji: "☕",
            tags: ["Arrays & Hashing", "Two Pointers", "Binary Search", "Trees & Recursion", "Java / Python"],
            highlight: "Daily algorithmic problem solving & time-complexity optimization",
        },
        {
            title: "Full-Stack Web Engineering",
            description: "Developing responsive web applications with robust Firebase & SQL integrations and Apple-inspired UI design.",
            status: "Active",
            emoji: "🚀",
            tags: ["React 19", "Tailwind CSS v4", "SQL Schemas", "Firebase Cloud", "Vite Tools"],
            highlight: "End-to-end platforms & cloud data architectures",
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
                    {nowItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="apple-card rounded-3xl p-7 group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="text-3xl p-3 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-color)] shadow-sm">{item.emoji}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">{item.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${item.status === 'Active' || item.status === 'Live' ? 'bg-emerald-500 animate-live' : 'bg-amber-500 animate-live'}`} />
                                            <span className="text-xs font-mono text-[var(--text-muted)] font-medium">{item.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                                    {item.description}
                                </p>

                                {/* Focus Topic Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                                <span className="line-clamp-1">{item.highlight}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NowSection;
