import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, X, Globe, GraduationCap, ArrowUpRight, Sparkles } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
};

/* Apple-style 3D Tilt Card */
const TiltCard = ({ children, className = '', onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 28 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 280, damping: 28 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
            title: "Grace of Christ Church Platform",
            subtitle: "Full-featured faith community web platform",
            problem: "The church community in Yetimoga, Kakinada needed an elegant digital platform for service schedules, sermons, event updates, and ministry outreach.",
            solution: "Designed and developed an Apple-inspired responsive platform with service timing highlights, sermon archives, interactive ministry pages, and giving portal.",
            impact: "Established a welcoming, modern digital gateway that connects members, visitors, and remote attendees seamlessly.",
            tech: ["React", "Tailwind CSS", "Vite", "Responsive UI", "Vercel"],
            category: "Featured Full Stack",
            icon: Globe,
            image: "/goc.png",
            featured: true,
            accentColor: "#10B981",
            features: [
                "Prayer & worship service timings display",
                "Community outreach & ministries showcase",
                "Sermon archives with media-first interface",
                "Mobile-first responsive design & smooth navigation",
                "Online offering & community interaction",
            ],
            link: "https://grace-of-christ-agy.vercel.app/",
            github: "https://github.com/subbaraoakula79-lang",
        },
        {
            id: 2,
            title: "National Admission Portal",
            subtitle: "Centralized student admission system",
            problem: "Students faced fragmented and cumbersome admission workflows across diverse academic institutions.",
            solution: "Architected a unified digital admission portal featuring automated document management, student verification, and real-time application tracking.",
            impact: "Streamlined applicant onboarding and administrative record management with reliable database integrity.",
            tech: ["Python", "SQL", "HTML5", "CSS3", "JavaScript"],
            category: "Full Stack System",
            icon: GraduationCap,
            image: null,
            featured: false,
            accentColor: "#6366f1",
            features: [
                "Centralized multi-institution application system",
                "Real-time status tracking & applicant verification",
                "Secure document repository & credential validation",
                "Dedicated administrative review console",
            ],
            link: "https://github.com/subbaraoakula79-lang",
            github: "https://github.com/subbaraoakula79-lang",
        },
    ];

    return (
        <section id="projects" className="py-32 px-6 md:px-12 relative">
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
                    <span className="section-label">Selected Work</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        Crafted with <span className="gradient-text shine-text">precision</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg leading-relaxed">
                        A curation of production-ready digital products, from design system to robust deployment.
                    </p>
                </motion.div>

                {/* Projects Presentation */}
                <div className="space-y-12">
                    {projects.map((project, idx) => {
                        const Icon = project.icon;
                        const isFeatured = project.featured;

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: idx * 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <TiltCard
                                    onClick={() => setSelectedProject(project)}
                                    className="apple-card rounded-3xl p-6 sm:p-8 md:p-10 cursor-pointer group"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                        {/* Image Preview / Banner */}
                                        {project.image ? (
                                            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] relative aspect-video group-hover:border-[var(--border-hover)] transition-colors duration-400">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover object-top transform group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium">
                                                        <Sparkles size={13} className="text-emerald-400" />
                                                        Explore Live Website
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="lg:col-span-5 p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--gradient-subtle)] flex flex-col justify-between aspect-video lg:aspect-auto">
                                                <div
                                                    className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--border-color)] shadow-sm"
                                                    style={{ background: `${project.accentColor}16`, color: project.accentColor }}
                                                >
                                                    <Icon size={28} />
                                                </div>
                                                <div className="mt-8">
                                                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">Architecture</span>
                                                    <p className="text-sm text-[var(--text-secondary)] mt-1">Multi-tier verified student document workflow with SQL persistence</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content Information */}
                                        <div className={project.image ? "lg:col-span-5 flex flex-col justify-between" : "lg:col-span-7 flex flex-col justify-between"}>
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span
                                                        className="text-[11px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border"
                                                        style={{
                                                            color: project.accentColor,
                                                            borderColor: `${project.accentColor}35`,
                                                            background: `${project.accentColor}10`,
                                                        }}
                                                    >
                                                        {project.category}
                                                    </span>
                                                    {isFeatured && (
                                                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                                                            Active Production
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 leading-snug tracking-tight">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                                                    {project.problem}
                                                </p>

                                                {/* Tech Stack Pills */}
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {project.tech.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="text-xs font-mono px-3 py-1 rounded-lg bg-[var(--glass-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--gradient-btn)] text-white text-xs font-semibold shadow-md hover:opacity-95 transition-all"
                                                >
                                                    <span>Live Website</span>
                                                    <ExternalLink size={13} />
                                                </a>
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] hover:border-[var(--border-hover)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--glass-bg)] transition-all"
                                                >
                                                    <Github size={14} />
                                                    <span>Code</span>
                                                </a>
                                                <span className="ml-auto text-xs font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">
                                                    Details
                                                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Apple-grade Detail Modal */}
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
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setSelectedProject(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                            className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl glass-panel max-h-[90vh] overflow-y-auto"
                            style={{ background: 'var(--bg-primary)' }}
                        >
                            {/* Specular line */}
                            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${selectedProject.accentColor}, transparent)` }} />

                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-5 right-5 z-20 p-2 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--glass-bg)] backdrop-blur-md transition-colors"
                                aria-label="Close"
                            >
                                <X size={18} />
                            </button>

                            <div className="p-8 md:p-10">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--border-color)] shadow-sm"
                                        style={{ background: `${selectedProject.accentColor}18`, color: selectedProject.accentColor }}
                                    >
                                        {(() => {
                                            const Icon = selectedProject.icon;
                                            return <Icon size={26} />;
                                        })()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{selectedProject.title}</h3>
                                        <p className="text-xs font-mono mt-0.5" style={{ color: selectedProject.accentColor }}>{selectedProject.category}</p>
                                    </div>
                                </div>

                                {selectedProject.image && (
                                    <div className="mb-6 rounded-2xl overflow-hidden border border-[var(--border-color)]">
                                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full object-cover aspect-video" />
                                    </div>
                                )}

                                {/* Problem / Solution / Impact */}
                                <div className="space-y-4 mb-6">
                                    {[
                                        { label: 'Problem & Objective', text: selectedProject.problem },
                                        { label: 'Solution Architecture', text: selectedProject.solution },
                                        { label: 'Outcome & Impact', text: selectedProject.impact },
                                    ].map(item => (
                                        <div key={item.label} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)]">
                                            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1 font-semibold">{item.label}</h4>
                                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Features */}
                                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3 font-semibold">Key Capabilities</h4>
                                <ul className="space-y-2 mb-6">
                                    {selectedProject.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <span style={{ color: selectedProject.accentColor }}>•</span>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech badges */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--glass-bg)]">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-3.5 rounded-full font-semibold text-sm text-white shadow-md transition-all hover:opacity-95"
                                        style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor}, #4f46e5)` }}
                                    >
                                        Open Live Website
                                    </a>
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3.5 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-hover)] bg-[var(--glass-bg)] transition-all flex items-center gap-2 text-sm font-medium"
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
