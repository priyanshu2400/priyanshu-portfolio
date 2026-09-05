import { motion } from 'framer-motion'

export default function Education() {
    return (
        <section id="education" className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                >
                    <span className="section-label">[Education]</span>
                    <div className="card p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                B.Tech in Information Technology
                            </h3>
                            <span
                                className="text-xs font-mono px-2 py-0.5 rounded-full w-fit"
                                style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
                            >
                                CGPA: 8.7
                            </span>
                        </div>
                        <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                            Maulana Abul Kalam Azad University of Technology · Kolkata, India
                        </p>
                        <p className="arch-meta">2022 — 2026</p>
                        <p className="text-sm mt-3" style={{ color: 'var(--color-text-muted)' }}>
                            What I learned here that matters: operating systems, networking, data structures, algorithms, and databases.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
