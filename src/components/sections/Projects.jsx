import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Server, Layout, Globe, GraduationCap, ArrowUpRight } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: "GOC Ministry Trust",
            subtitle: "Full-featured faith community platform",
            problem: "The organization needed a digital presence with event management and sermon archives.",
            solution: "Built a responsive platform with event announcements, sermon archives, and community blog system.",
            impact: "Enabled digital outreach and community engagement for the organization.",
            tech: ["HTML/CSS", "JavaScript", "Firebase", "Responsive Design"],
            category: "Full Stack",
            icon: Globe,
            accentColor: "#10B981",
            features: [
                "Event announcements & management",
                "Sermon archive with media player",
                "Community news & blog system",
                "Mobile-first responsive layout",
            ],
            link: "#",
            github: "#",
        },
        {
            id: 2,
            title: "National Admission Portal",
            subtitle: "Centralized student admission system",
            problem: "Students faced fragmented admission processes across multiple institutions.",
            solution: "Created a centralized portal with real-time tracking and multi-institution support.",
            impact: "Streamlined admissions with secure document management and status tracking.",
            tech: ["Python", "HTML/CSS", "JavaScript", "Database"],
            category: "Full Stack",
            icon: GraduationCap,
            accentColor: "#3B82F6",
            features: [
                "Centralized multi-institution portal",
                "Real-time application status tracking",
                "Secure document upload & verification",
                "Student & admin dashboards",
            ],
            link: "#",
            github: "#",
        },
        {
            id: 3,
            title: "College Admission System",
            subtitle: "Campus-level admission management",
            problem: "Manual college admission processes were error-prone and time-consuming.",
            solution: "Developed an end-to-end digital admission system with authentication and document handling.",
            impact: "Reduced manual processing and enabled secure student self-service applications.",
            tech: ["Python", "HTML/CSS", "JavaScript", "Database"],
            category: "Full Stack",
            icon: Server,
            accentColor: "#8B5CF6",
            features: [
                "Student authentication system",
                "Secure document handling",
                "Student management dashboard",
                "Application status tracking",
            ],
            link: "#",
            github: "#",
        },
        {
            id: 4,
            title: "Interactive AI Portfolio",
            subtitle: "This portfolio — a cinematic web experience",
            problem: "Needed a portfolio that stands out and demonstrates both technical and creative ability.",
            solution: "Built an immersive experience with scroll animations, custom cursor, and cinematic transitions.",
            impact: "A portfolio that feels like a product, not a template.",
            tech: ["React", "TailwindCSS", "Framer Motion", "GSAP"],
            category: "Frontend",
            icon: Layout,
            accentColor: "#EC4899",
            features: [
                "Cinematic scroll animations",
                "Custom magnetic cursor",
                "Command palette navigation",
                "Light / Dark theme toggle",
            ],
            link: "#",
            github: "#",
        },
    ];

    return (
        <section id="projects" className="py-28 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-20"
                >
                    <span className="section-label">Work</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Selected <span className="gradient-text shine-text">projects</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg">
                        Each project is a product story — from problem to solution to impact.
                    </p>
                </motion.div>

                {/* Project Cards — Full width stacked */}
                <div className="space-y-6">
                    {projects.map((project, idx) => {
                        const Icon = project.icon;
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="card rounded-2xl p-6 md:p-8 cursor-pointer group relative overflow-hidden"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                    {/* Icon + Category */}
                                    <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-3">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center border border-[var(--border-color)]"
                                            style={{ background: `${project.accentColor}10`, color: project.accentColor }}
                                        >
                                            <Icon size={22} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="md:col-span-8">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-[var(--text-primary)]">{project.title}</h3>
                                            <span
                                                className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-[var(--border-color)]"
                                                style={{ color: project.accentColor }}
                                            >
                                                {project.category}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)] mb-3">{project.subtitle}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map(t => (
                                                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="md:col-span-3 flex items-center justify-end gap-3">
                                        <a
                                            href={project.github}
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
                                        >
                                            <Github size={16} />
                                        </a>
                                        <a
                                            href={project.link}
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2.5 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all"
                                            style={{ color: project.accentColor }}
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                        <div className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                                            <span>Details</span>
                                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl"
                            style={{ background: 'var(--bg-primary)' }}
                        >
                            {/* Close */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="p-8 md:p-10">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--border-color)]"
                                        style={{ background: `${selectedProject.accentColor}10`, color: selectedProject.accentColor }}
                                    >
                                        {(() => { const Icon = selectedProject.icon; return <Icon size={28} />; })()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[var(--text-primary)]">{selectedProject.title}</h3>
                                        <p className="text-sm" style={{ color: selectedProject.accentColor }}>{selectedProject.category}</p>
                                    </div>
                                </div>

                                {/* Problem → Solution → Impact */}
                                <div className="space-y-5 mb-8">
                                    {[
                                        { label: 'Problem', text: selectedProject.problem },
                                        { label: 'Solution', text: selectedProject.solution },
                                        { label: 'Impact', text: selectedProject.impact },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{item.label}</h4>
                                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Features */}
                                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">Key Features</h4>
                                <ul className="space-y-2 mb-8">
                                    {selectedProject.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <span style={{ color: selectedProject.accentColor }}>→</span>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)]">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <a
                                        href={selectedProject.link}
                                        className="flex-1 text-center py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                                        style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor}, ${selectedProject.accentColor}dd)` }}
                                    >
                                        View Project
                                    </a>
                                    <a
                                        href={selectedProject.github}
                                        className="px-5 py-3.5 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all flex items-center gap-2 text-sm font-medium"
                                    >
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
