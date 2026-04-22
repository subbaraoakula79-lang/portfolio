import { motion } from 'framer-motion';
import { BookOpen, Code2 } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const About = () => {
    const education = [
        {
            level: 'BSc Information Technology',
            institution: 'PR Degree College, Adikavi Nannaya University',
            period: 'Present',
            status: '1st Year Ongoing',
        },
        {
            level: 'Intermediate (MPC)',
            institution: 'State Board',
            period: '2023 – 2025',
            status: '75%',
        },
        {
            level: '10th Standard',
            institution: 'State Board',
            period: '2022 – 2023',
            status: '79%',
        },
    ];

    const skills = [
        'HTML & CSS', 'JavaScript', 'React', 'Tailwind CSS',
        'Framer Motion', 'Firebase', 'Python',
        'Prompt Engineering', 'AI Tools', 'Git',
        'Responsive Design', 'MS Office',
    ];

    return (
        <section id="about" className="py-28 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-20"
                >
                    <span className="section-label">About</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        A little about <span className="gradient-text shine-text">me</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
                    {/* Story — 3 cols */}
                    <div className="lg:col-span-3 space-y-12">
                        {/* Personal narrative */}
                        <motion.div
                            variants={fadeUp}
                            custom={0.1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-5"
                        >
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                I'm Sanjay — a BSc IT student who fell in love with the intersection of
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
                                When I'm not coding, you'll find me exploring AI tools, competing in archery,
                                or diving into the latest in web technology. I'm always looking for the
                                next challenge that pushes my boundaries.
                            </p>
                        </motion.div>

                        {/* Education Timeline */}
                        <motion.div
                            variants={fadeUp}
                            custom={0.2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 rounded-xl bg-[var(--gradient-subtle)] flex items-center justify-center text-primary border border-[var(--border-color)]">
                                    <BookOpen size={18} />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Education</h3>
                            </div>

                            <div className="space-y-4 pl-4 border-l border-[var(--border-color)]">
                                {education.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative pl-6"
                                    >
                                        {/* Dot */}
                                        <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-primary" />

                                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                                            <h4 className="text-sm font-semibold text-[var(--text-primary)]">{item.level}</h4>
                                            <span className="text-xs font-mono text-[var(--text-muted)]">{item.period}</span>
                                        </div>
                                        <p className="text-xs text-[var(--text-secondary)]">{item.institution}</p>
                                        <span className="text-xs font-mono text-primary mt-1 inline-block">{item.status}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Skills — 2 cols */}
                    <motion.div
                        variants={fadeUp}
                        custom={0.3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-xl bg-[var(--gradient-subtle)] flex items-center justify-center text-secondary border border-[var(--border-color)]">
                                <Code2 size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Skills</h3>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {skills.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04 }}
                                    className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] rounded-xl border border-[var(--border-color)] hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>

                        {/* Quick Facts */}
                        <div className="mt-10 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--gradient-subtle)]">
                            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Quick facts</h4>
                            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                                <div className="flex items-center gap-3">
                                    <span className="text-base">📍</span>
                                    <span>Based in India</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-base">🎓</span>
                                    <span>BSc IT, 1st Year</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-base">🏹</span>
                                    <span>Competitive Archer</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-base">🤖</span>
                                    <span>AI & Prompt Engineering</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
