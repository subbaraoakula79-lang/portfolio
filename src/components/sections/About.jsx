import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code2, ChevronRight } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const skillCategories = [
    {
        id: 'languages',
        label: 'Programming Languages',
        color: '#6366f1',
        skills: ['Java', 'Python', 'JavaScript'],
    },
    {
        id: 'web',
        label: 'Web Technologies',
        color: '#10B981',
        skills: ['HTML5', 'CSS3'],
    },
    {
        id: 'database',
        label: 'Database',
        color: '#F59E0B',
        skills: ['SQL', 'Firebase'],
    },
    {
        id: 'tools',
        label: 'Tools',
        color: '#8B5CF6',
        skills: ['GitHub'],
    },
    {
        id: 'other',
        label: 'Other Skills',
        color: '#EC4899',
        skills: ['Responsive Web Design', 'Debugging', 'Problem Solving', 'LeetCode'],
    },
];

const About = () => {
    const [activeTab, setActiveTab] = useState('languages');

    const education = [
        { level: 'BSc Information Technology', institution: 'PR Degree College, Adikavi Nannaya University', period: 'Present', status: '1st Year Ongoing' },
        { level: 'Intermediate (MPC)', institution: 'State Board', period: '2023 – 2025', status: '75%' },
        { level: '10th Standard', institution: 'State Board', period: '2022 – 2023', status: '79%' },
    ];

    const activeCategory = skillCategories.find(c => c.id === activeTab);

    return (
        <section id="about" className="py-28 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mb-20">
                    <span className="section-label">About</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        A little about <span className="gradient-text shine-text">me</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
                    {/* Story — 3 cols */}
                    <div className="lg:col-span-3 space-y-12">
                        <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                I'm <strong className="text-[var(--text-primary)]">Sanjay</strong> — a BSc IT student who fell in love with the intersection of
                                technology and design. I don't just write code; I craft experiences that
                                are clean, purposeful, and memorable.
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                From building full-stack platforms to designing pixel-perfect frontends,
                                I approach every project with the same philosophy: <strong className="text-[var(--text-primary)]">simplicity is the ultimate sophistication</strong>.
                                I believe great products are built at the crossroads of technical precision
                                and creative vision.
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                When I'm not coding, you'll find me solving problems on LeetCode, competing in archery,
                                or diving into the latest in web development. I'm always looking for the
                                next challenge that pushes my boundaries.
                            </p>
                        </motion.div>

                        {/* Education Timeline */}
                        <motion.div variants={fadeUp} custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 rounded-xl bg-[var(--gradient-subtle)] flex items-center justify-center text-[#6366f1] border border-[var(--border-color)]">
                                    <BookOpen size={18} />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Education</h3>
                            </div>
                            <div className="space-y-4 pl-4 border-l border-[var(--border-color)]">
                                {education.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative pl-6"
                                    >
                                        <div className="absolute -left-[5px] top-2.5 w-2.5 h-2.5 rounded-full bg-[#6366f1] border-2 border-[var(--bg-primary)]" />
                                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                                            <h4 className="text-sm font-semibold text-[var(--text-primary)]">{item.level}</h4>
                                            <span className="text-xs font-mono text-[var(--text-muted)]">{item.period}</span>
                                        </div>
                                        <p className="text-xs text-[var(--text-secondary)]">{item.institution}</p>
                                        <span className="text-xs font-mono text-[#6366f1] mt-1 inline-block">{item.status}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Facts */}
                        <motion.div variants={fadeUp} custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--gradient-subtle)]">
                                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Quick facts</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm text-[var(--text-secondary)]">
                                    {[
                                        { emoji: '📍', text: 'Based in India' },
                                        { emoji: '🎓', text: 'BSc IT, 1st Year' },
                                        { emoji: '🏹', text: 'Competitive Archer' },
                                        { emoji: '💡', text: 'Problem Solving' },
                                    ].map(({ emoji, text }) => (
                                        <div key={text} className="flex items-center gap-2">
                                            <span>{emoji}</span>
                                            <span>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Skills — 2 cols */}
                    <motion.div variants={fadeUp} custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-xl bg-[var(--gradient-subtle)] flex items-center justify-center text-[#8B5CF6] border border-[var(--border-color)]">
                                <Code2 size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Skills</h3>
                        </div>

                        {/* Tab filters */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {skillCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${activeTab === cat.id
                                        ? 'text-white border-transparent'
                                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
                                        }`}
                                    style={activeTab === cat.id ? { background: cat.color, boxShadow: `0 4px 14px ${cat.color}40` } : {}}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Active skills */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.25 }}
                                className="flex flex-wrap gap-2"
                            >
                                {activeCategory?.skills.map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.88 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="skill-tag"
                                        style={{ '--tag-color': activeCategory.color }}
                                    >
                                        <ChevronRight size={11} style={{ color: activeCategory.color }} />
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
