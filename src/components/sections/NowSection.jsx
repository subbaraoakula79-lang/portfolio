import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const NowSection = () => {
    const nowItems = [
        {
            title: "Learning the React Ecosystem",
            description: "Deep-diving into React 19, Framer Motion, and modern state management patterns.",
            status: "In Progress",
            emoji: "⚛️",
        },
        {
            title: "Building This Portfolio",
            description: "Crafting an immersive, cinematic portfolio experience with scroll-driven animations.",
            status: "Live",
            emoji: "🚀",
        },
    ];

    return (
        <section className="py-28 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12"
                >
                    <span className="section-label">Now</span>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        What I'm <span className="gradient-text shine-text">currently</span> building
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
                    {nowItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card rounded-2xl p-6 group"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">{item.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-base font-semibold text-[var(--text-primary)]">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.status === 'Live' ? 'bg-green-500 animate-live' : 'bg-amber-500 animate-live'}`} />
                                        <span className="text-xs font-mono text-[var(--text-muted)]">{item.status}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NowSection;
