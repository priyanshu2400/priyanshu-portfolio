import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function BlogCTA({ onOpenBlog }) {
    return (
        <section id="notes" className="py-24 px-6" style={{ background: 'var(--color-surface-raised)' }}>
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                    className="mb-12"
                >
                    <span className="section-label">[Engineering Notes]</span>
                    <h2
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                    >
                        What I've written
                    </h2>
                    <p className="mt-2" style={{ color: 'var(--color-text-secondary)', textWrap: 'balance' }}>
                        Notes from things I broke, fixed, measured, and learned while building production systems.
                    </p>
                </motion.div>

                {/* Blog preview cards */}
                <div className="space-y-3 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                        onClick={onOpenBlog}
                        className="card p-5 cursor-pointer group"
                    >
                        <h3
                            className="text-base font-semibold mb-1 transition-colors duration-150"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Why My Python Metrics Died After Gunicorn Forked
                        </h3>
                        <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                            A production metrics bug that turned out to be a process-lifecycle problem.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="tag tag-accent">Python</span>
                            <span className="tag tag-accent">OpenTelemetry</span>
                            <span className="tag tag-accent">Observability</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', duration: 0.4, delay: 0.06, bounce: 0 }}
                        onClick={onOpenBlog}
                        className="card p-5 cursor-pointer group"
                    >
                        <h3
                            className="text-base font-semibold mb-1 transition-colors duration-150"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            What eBPF Taught Me About Linux Observability
                        </h3>
                        <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                            Experiments with eBPF and what it changes about observing systems below the application layer.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="tag tag-accent">eBPF</span>
                            <span className="tag tag-accent">Linux</span>
                            <span className="tag tag-accent">Observability</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.4, delay: 0.1, bounce: 0 }}
                >
                    <button
                        onClick={onOpenBlog}
                        className="btn btn-secondary"
                    >
                        <BookOpen size={16} />
                        Read all notes
                        <ArrowRight size={14} />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
