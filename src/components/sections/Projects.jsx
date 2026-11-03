import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, X, Server, Layout, Globe, GraduationCap, ArrowUpRight } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

/* 3-D tilt card wrapper */
const TiltCard = ({ children, className = '', onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: 'GOC Ministry Trust',
            subtitle: 'Full-featured faith community platform',
            problem: 'The organization needed a digital presence with event management and sermon archives.',
            solution: 'Built a responsive platform with event announcements, sermon archives, and community blog system.',
            impact: 'Enabled digital outreach and community engagement for the organization.',
            tech: ['HTML/CSS', 'JavaScript', 'Firebase', 'Responsive Design'],
            category: 'Full Stack',
            icon: Globe,
            accentColor: '#10B981',
            gradient: 'from-emerald-500/10 to-teal-500/5',
            features: [
                'Event announcements & management',
                'Sermon archive with media player',
                'Community news & blog system',
                'Mobile-first responsive layout',
            ],
            link: '#',
            github: '#',
        },
        {
            id: 2,
            title: 'National Admission Portal',
            subtitle: 'Centralized student admission system',
            problem: 'Students faced fragmented admission processes across multiple institutions.',
            solution: 'Created a centralized portal with real-time tracking and multi-institution support.',
            impact: 'Streamlined admissions with secure document management and status tracking.',
            tech: ['Python', 'HTML/CSS', 'JavaScript', 'Database'],
            category: 'Full Stack',
            icon: GraduationCap,
            accentColor: '#6366f1',
            gradient: 'from-indigo-500/10 to-blue-500/5',
            features: [
                'Centralized multi-institution portal',
                'Real-time application status tracking',
                'Secure document upload & verification',
                'Student & admin dashboards',
            ],
            link: '#',
            github: '#',
        },
        {
            id: 3,
            title: 'College Admission System',
            subtitle: 'Campus-level admission management',
            problem: 'Manual college admission processes were error-prone and time-consuming.',
            solution: 'Developed an end-to-end digital admission system with authentication and document handling.',
            impact: 'Reduced manual processing and enabled secure student self-service applications.',
            tech: ['Python', 'HTML/CSS', 'JavaScript', 'Database'],
            category: 'Full Stack',
            icon: Server,
            accentColor: '#8B5CF6',
            gradient: 'from-violet-500/10 to-purple-500/5',
            features: [
                'Student authentication system',
                'Secure document handling',
                'Student management dashboard',
                'Application status tracking',
            ],
            link: '#',
            github: '#',
        },
    ];

    return (
        <section id="projects" className="py-28 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mb-20">
                    <span className="section-label">Work</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Selected <span className="gradient-text shine-text">projects</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg">
                        Each project is a product story — from problem to solution to impact.
                    </p>
                </motion.div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project, idx) => {
                        const Icon = project.icon;
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: idx * 0.12, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <TiltCard
                                    onClick={() => setSelectedProject(project)}
                                    className="card-premium rounded-2xl p-6 cursor-pointer h-full flex flex-col group"
                                >
                                    {/* Top accent line */}
                                    <div
                                        className="absolute top-0 left-6 right-6 h-px rounded-full opacity-60"
                                        style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)` }}
                                    />

                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-[var(--border-color)] flex-shrink-0"
                                        style={{ background: `${project.accentColor}14`, color: project.accentColor }}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    {/* Category badge */}
                                    <span
                                        className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border self-start mb-3"
                                        style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, background: `${project.accentColor}0d` }}
                                    >
                                        {project.category}
                                    </span>

                                    {/* Title & subtitle */}
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 leading-snug">{project.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed flex-1">{project.subtitle}</p>

                                    {/* Tech badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer actions */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-color)]">
                                        <div className="flex gap-2">
                                            <a
                                                href={project.github}
                                                onClick={e => e.stopPropagation()}
                                                className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
                                                aria-label="GitHub"
                                            >
                                                <Github size={14} />
                                            </a>
                                            <a
                                                href={project.link}
                                                onClick={e => e.stopPropagation()}
                                                className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all"
                                                style={{ color: project.accentColor }}
                                                aria-label="Live Demo"
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                        <span className="text-xs font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
                                            Details
                                            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.94, y: 24, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.94, y: 24, opacity: 0 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                            className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl"
                            style={{ background: 'var(--bg-primary)' }}
                        >
                            {/* Top accent */}
                            <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${selectedProject.accentColor}, transparent)` }} />

                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                aria-label="Close"
                            >
                                <X size={18} />
                            </button>

                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--border-color)]"
                                        style={{ background: `${selectedProject.accentColor}14`, color: selectedProject.accentColor }}>
                                        {(() => { const Icon = selectedProject.icon; return <Icon size={28} />; })()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[var(--text-primary)]">{selectedProject.title}</h3>
                                        <p className="text-sm font-mono" style={{ color: selectedProject.accentColor }}>{selectedProject.category}</p>
                                    </div>
                                </div>

                                <div className="space-y-5 mb-8">
                                    {[
                                        { label: 'Problem', text: selectedProject.problem },
                                        { label: 'Solution', text: selectedProject.solution },
                                        { label: 'Impact', text: selectedProject.impact },
                                    ].map(item => (
                                        <div key={item.label}>
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{item.label}</h4>
                                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>

                                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">Key Features</h4>
                                <ul className="space-y-2 mb-8">
                                    {selectedProject.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <span style={{ color: selectedProject.accentColor }}>→</span>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)]">{t}</span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <a href={selectedProject.link}
                                        className="flex-1 text-center py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                                        style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor}, ${selectedProject.accentColor}cc)` }}>
                                        View Project
                                    </a>
                                    <a href={selectedProject.github}
                                        className="px-5 py-3.5 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all flex items-center gap-2 text-sm font-medium">
                                        <Github size={16} /> Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
