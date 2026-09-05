import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                    className="mb-12"
                >
                    <span className="section-label">[Experience]</span>
                    <h2
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                    >
                        Where I've worked
                    </h2>
                </motion.div>

                {/* PhonePe — Full-time */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                    className="card p-6 sm:p-8 mb-5"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Software Engineer
                        </h3>
                        <span
                            className="text-xs font-mono px-2 py-0.5 rounded-full w-fit"
                            style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
                        >
                            Full-time
                        </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        PhonePe · Bangalore, India
                    </p>
                    <p className="arch-meta">July 2025 — Present</p>

                    <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}>
                        I work on internal platforms used by production services and infrastructure teams. My work currently spans two very different systems:
                    </p>

                    <div className="mt-4 space-y-3">
                        <div>
                            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>OBX</span>
                            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                A centralized observability platform covering metrics, logs, and traces across multiple regions. I became the primary point of contact after scaling it from a single-region prototype to the standard telemetry service for PhonePe's major cloud apps.
                            </p>
                        </div>
                        <div>
                            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>PPEC (PhonePe Cloud)</span>
                            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                A bare-metal provisioning and firmware orchestration platform operating across a fleet of thousands of servers. I redesigned the firmware upload workflow, reducing upgrade time from days to minutes.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>
                        The interesting problems have ranged from OpenTelemetry process lifecycle issues to telemetry access control and firmware workflows.
                    </p>
                </motion.div>

                {/* PhonePe — Intern */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', duration: 0.5, delay: 0.08, bounce: 0 }}
                    className="card p-6 sm:p-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Software Developer Intern
                        </h3>
                        <span
                            className="text-xs font-mono px-2 py-0.5 rounded-full w-fit"
                            style={{ background: 'rgba(212,160,60,0.08)', color: 'var(--color-accent)' }}
                        >
                            Intern
                        </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        PhonePe · Bangalore, India
                    </p>
                    <p className="arch-meta">January 2025 — June 2025</p>

                    <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}>
                        This is where I architected OBX from scratch — a 5-layer Observability as a Service platform covering all three telemetry pillars. I also built a zero-code instrumentation SDK on OpenTelemetry that reduced manual instrumentation effort by 85%, and wrote a Go-based Nginx access log tailer for proxy-level request drop visibility.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
