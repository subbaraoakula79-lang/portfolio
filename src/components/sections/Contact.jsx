import { useState } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin, Send, CheckCircle, ArrowUpRight } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    }),
};

const Contact = () => {
    const { stageIndex, buildState } = useCollaboration();
    const isAssembled = Boolean(buildState.isComplete || stageIndex >= 10);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFormState({ name: '', email: '', message: '' });
            }, 3500);
        }, 1200);
    };

    const contactLinks = [
        { icon: Mail, label: 'Email', value: 'akulasanjay84@gmail.com', href: 'mailto:akulasanjay84@gmail.com', color: '#6366f1' },
        { icon: Phone, label: 'Phone', value: '+91 8639064377', href: 'tel:8639064377', color: '#10B981' },
        { icon: Instagram, label: 'Instagram', value: '@sanjay._0084', href: 'https://instagram.com/sanjay._0084', color: '#EC4899' },
        { icon: Linkedin, label: 'LinkedIn', value: 'Akula Sanjay', href: 'https://www.linkedin.com/in/akula-sanjay-a6477b38a', color: '#3B82F6' },
    ];

    return (
        <section id="contact" className="py-32 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-20"
                >
                    <span className="section-label justify-center">Get In Touch</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        Let's build something{' '}
                        <span className="gradient-text shine-text">exceptional</span>
                        <br className="hidden sm:block" />
                        {' '}together.
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
                        Open to engineering opportunities, collaborative ventures, and technical discussions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
                    {/* Contact Links — 5 cols */}
                    {!isAssembled ? (
                        <div className="lg:col-span-5 rounded-3xl p-8 border border-dashed border-[#3B82F6]/35 bg-[#3B82F6]/5 min-h-[340px] flex flex-col items-center justify-center text-center gap-3">
                            <Mail size={24} className="text-[#3B82F6] animate-pulse" />
                            <span className="text-xs font-mono uppercase tracking-widest text-[#3B82F6] font-semibold">
                                UI Designer · Assembling Channel Links
                            </span>
                        </div>
                    ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.93, x: -24 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                        className="lg:col-span-5 space-y-4"
                    >
                        {contactLinks.map((info, idx) => {
                            const Icon = info.icon;
                            return (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="apple-card p-5 rounded-2xl flex items-center gap-4 group"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--border-color)] transition-colors shadow-sm"
                                        style={{ background: `${info.color}15`, color: info.color }}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-0.5">{info.label}</p>
                                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{info.value}</p>
                                    </div>
                                    <ArrowUpRight size={15} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </motion.a>
                            );
                        })}
                    </motion.div>
                    )}

                    {/* Contact Form — 7 cols */}
                    {!isAssembled ? (
                        <div className="lg:col-span-7 rounded-3xl p-10 border border-dashed border-[#10B981]/35 bg-[#10B981]/5 min-h-[380px] flex flex-col items-center justify-center text-center gap-3">
                            <Send size={24} className="text-[#10B981] animate-pulse" />
                            <span className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                                Frontend Designer · Wiring Contact Form Inputs
                            </span>
                        </div>
                    ) : (
                    <motion.form
                        initial={{ opacity: 0, scale: 0.93, x: 24 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-7 apple-card rounded-3xl p-8 sm:p-10 shadow-lg"
                    >
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2 font-semibold">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm shadow-sm"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2 font-semibold">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm shadow-sm"
                                    placeholder="you@domain.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2 font-semibold">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none text-sm shadow-sm"
                                    placeholder="Tell me about your project or inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className="w-full py-4 rounded-full font-semibold text-sm text-white transition-all duration-300 disabled:opacity-85 shadow-md relative overflow-hidden"
                                style={{ background: isSuccess ? 'linear-gradient(135deg, #10b981, #059669)' : 'var(--gradient-btn)' }}
                            >
                                <span className={`flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                                    {isSuccess ? (<><CheckCircle size={16} /> Message Delivered!</>) : (<><Send size={15} /> Send Message</>)}
                                </span>
                                {isSubmitting && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </motion.form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
