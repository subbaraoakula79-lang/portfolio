import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin, Send, CheckCircle, ArrowUpRight } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const Contact = () => {
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
        }, 1500);
    };

    const contactLinks = [
        { icon: Mail, label: 'Email', value: 'akulasanjay84@gmail.com', href: 'mailto:akulasanjay84@gmail.com', color: '#6366f1' },
        { icon: Phone, label: 'Phone', value: '+91 8639064377', href: 'tel:8639064377', color: '#10B981' },
        { icon: Instagram, label: 'Instagram', value: '@sanjay._0084', href: 'https://instagram.com/sanjay._0084', color: '#EC4899' },
        { icon: Linkedin, label: 'LinkedIn', value: 'Akula Sanjay', href: 'https://www.linkedin.com/in/akula-sanjay-a6477b38a', color: '#3B82F6' },
    ];

    return (
        <section id="contact" className="py-28 px-6 md:px-12 relative">
            <div className="section-divider mb-28" />
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Headline */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="text-center mb-20">
                    <span className="section-label justify-center">Contact</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Let's build something{' '}
                        <span className="gradient-text shine-text">great</span>
                        <br className="hidden sm:block" />
                        {' '}together.
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
                        Open to opportunities, collaborations, and new ideas.
                        Let's turn your vision into reality.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start max-w-5xl mx-auto">
                    {/* Contact Links */}
                    <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
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
                                    whileHover={{ x: 4 }}
                                    className="card p-5 rounded-2xl flex items-center gap-4 group"
                                >
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--border-color)] transition-colors"
                                        style={{ background: `${info.color}14`, color: info.color }}
                                    >
                                        <Icon size={18} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-0.5">{info.label}</p>
                                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{info.value}</p>
                                    </div>
                                    <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </motion.a>
                            );
                        })}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        variants={fadeUp}
                        custom={0.2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="card rounded-2xl p-7 md:p-8"
                    >
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm"
                                    placeholder="you@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none text-sm"
                                    placeholder="I'd love to collaborate on..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-80 relative overflow-hidden"
                                style={{ background: isSuccess ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'var(--gradient-btn)' }}
                            >
                                <span className={`flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                                    {isSuccess ? (<><CheckCircle size={16} /> Message sent!</>) : (<><Send size={14} /> Send Message</>)}
                                </span>
                                {isSubmitting && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
