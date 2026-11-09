import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code2, Terminal, Database, Wrench, Cpu, ChevronRight, Sparkles } from 'lucide-react';
import { skillCategoriesData, educationData, aboutContentData } from '../../data/skillsData';
import { useCollaboration } from '../../context/CollaborationContext';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    }),
};

const iconMap = {
    Code2,
    Terminal,
    Database,
    Wrench,
    Cpu,
};

const skillCategories = skillCategoriesData.map(category => ({
    ...category,
    icon: iconMap[category.iconName] || Code2,
}));

const About = () => {
    const [activeTab, setActiveTab] = useState('frontend');
    const { stageIndex, buildState } = useCollaboration();
    const isAssembled = Boolean(buildState.isComplete || stageIndex >= 7);

    const education = educationData;

    const activeCategory = skillCategories.find(c => c.id === activeTab) || skillCategories[0];

    return (
        <section id="about" className="py-32 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-20"
                >
                    <span className="section-label">{aboutContentData.sectionLabel}</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        {aboutContentData.headingPrefix} <span className="gradient-text shine-text">{aboutContentData.headingHighlight}</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg leading-relaxed">
                        An overview of my developer journey, technical philosophy, and disciplined foundations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Story & Education Column — 7 cols */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Personal Narrative */}
                        {!isAssembled ? (
                            <div className="rounded-3xl p-8 sm:p-10 border border-dashed border-[#6366f1]/30 bg-[#6366f1]/5 min-h-[280px] flex flex-col items-center justify-center text-center gap-3">
                                <Sparkles size={20} className="text-[#6366f1] animate-pulse" />
                                <span className="text-xs font-mono uppercase tracking-widest text-[#6366f1] font-semibold">
                                    Layout Designer · Assembling Narrative Card
                                </span>
                            </div>
                        ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 20 }}
                            className="apple-card rounded-3xl p-8 sm:p-10 space-y-6"
                        >
                            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#6366f1] font-semibold">
                                <Sparkles size={14} />
                                <span>The Journey</span>
                            </div>
                            {aboutContentData.paragraphs.map((paragraph, idx) => (
                                <p key={idx} className="text-base text-[var(--text-secondary)] leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]">
                                <div>
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Core Focus</span>
                                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">Full-Stack Web &amp; Logic</p>
                                </div>
                                <div>
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Mindset</span>
                                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">Focus, Speed &amp; Accuracy</p>
                                </div>
                                <div>
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Athletics</span>
                                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">Inter-University Archery</p>
                                </div>
                            </div>
                        </motion.div>
                        )}

                        {/* Education Timeline */}
                        {!isAssembled ? (
                            <div className="rounded-3xl p-8 sm:p-10 border border-dashed border-[#8B5CF6]/30 bg-[#8B5CF6]/5 min-h-[300px] flex flex-col items-center justify-center text-center gap-3">
                                <BookOpen size={20} className="text-[#8B5CF6] animate-pulse" />
                                <span className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6] font-semibold">
                                    UX Designer · Structuring Academic Timeline
                                </span>
                            </div>
                        ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, x: 24 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.1 }}
                            className="apple-card rounded-3xl p-8 sm:p-10"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-2xl bg-[var(--gradient-subtle)] flex items-center justify-center text-[#6366f1] border border-[var(--border-color)] shadow-sm">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Academic Timeline</h3>
                                    <p className="text-xs text-[var(--text-muted)] font-mono">Formal education &amp; milestones</p>
                                </div>
                            </div>

                            <div className="space-y-8 pl-4 border-l border-[var(--border-color)]">
                                {education.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className="relative pl-6"
                                    >
                                        <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-[#6366f1] border-2 border-[var(--bg-primary)] shadow-sm ring-2 ring-[#6366f1]/20" />
                                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                            <h4 className="text-base font-semibold text-[var(--text-primary)]">{item.level}</h4>
                                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-muted)]">{item.period}</span>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)] font-medium mb-1">{item.institution}</p>
                                        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">{item.focus}</p>
                                        <span className="text-xs font-mono font-semibold text-[#6366f1] inline-block">{item.status}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        )}
                    </div>

                    {/* Skills Column — 5 cols */}
                    <div className="lg:col-span-5 space-y-6">
                        {!isAssembled ? (
                            <div className="rounded-3xl p-8 sm:p-9 border border-dashed border-[#10B981]/30 bg-[#10B981]/5 min-h-[380px] flex flex-col items-center justify-center text-center gap-3">
                                <Code2 size={20} className="text-[#10B981] animate-pulse" />
                                <span className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                                    Frontend Designer · Placing Skill Tag Pills
                                </span>
                            </div>
                        ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.15 }}
                            className="apple-card rounded-3xl p-8 sm:p-9"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-[var(--gradient-subtle)] flex items-center justify-center text-[#8B5CF6] border border-[var(--border-color)] shadow-sm">
                                    <Code2 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Technical Stack</h3>
                                    <p className="text-xs text-[var(--text-muted)] font-mono">Categorized &amp; verified skills</p>
                                </div>
                            </div>

                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {skillCategories.map(cat => {
                                    const Icon = cat.icon;
                                    const isActive = activeTab === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveTab(cat.id)}
                                            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-full border transition-all duration-300 ${
                                                isActive
                                                    ? 'text-white border-transparent shadow-md'
                                                    : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] bg-[var(--glass-bg)]'
                                            }`}
                                            style={isActive ? { background: cat.color, boxShadow: `0 4px 18px ${cat.color}45` } : {}}
                                        >
                                            <Icon size={13} />
                                            <span>{cat.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Active Category Display */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md"
                                >
                                    <div className="flex items-center gap-2.5 mb-2">
                                        {(() => {
                                            const Icon = activeCategory.icon;
                                            return <Icon size={16} style={{ color: activeCategory.color }} />;
                                        })()}
                                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{activeCategory.label}</h4>
                                    </div>
                                    <p className="text-xs text-[var(--text-muted)] mb-5 leading-relaxed">
                                        {activeCategory.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {activeCategory.skills.map((skill, i) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="skill-tag"
                                            >
                                                <ChevronRight size={12} style={{ color: activeCategory.color }} />
                                                <span className="font-medium text-xs">{skill}</span>
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
