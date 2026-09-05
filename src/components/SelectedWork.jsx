import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const works = [
    {
        id: 'obx',
        title: 'OBX — Observability as a Service',
        description: 'Architected OBX from scratch as a 5-layer Observability as a Service platform to achieve complete API observability across all three telemetry pillars.',
        problem: 'Telemetry was fragmented across services. Debugging meant jumping between dashboards, log stores, and trace backends.',
        whatChanged: 'Standardized instrumentation and moved metrics, traces, and logs through a common observability pipeline.',
        interesting: 'Making Python metrics survive Gunicorn/uWSGI forking and correlating logs with traces across a request.',
        evidence: ['3 production regions', 'Large-scale server fleet', 'OpenTelemetry', 'Prometheus / Grafana / Jaeger', 'Go + Python'],
        link: '#blog/multiprocess-python-metrics',
    },
    {
        id: 'ppec',
        title: 'PPEC (PhonePe Cloud) \u2014 Bare-Metal Provisioning',
        description: 'Infrastructure orchestration for firmware management across PhonePe\'s on-premise bare-metal fleet.',
        problem: 'Firmware upgrades across thousands of servers took days and required manual intervention at multiple stages.',
        whatChanged: 'Redesigned the firmware upload path and became the primary point of contact for the provisioning platform.',
        interesting: 'Cutting bare-metal firmware upgrade time from days to minutes through workflow redesign.',
        evidence: ['Thousands of servers', 'Firmware workflows', 'Bare-metal infrastructure', 'Production ownership'],
        link: null,
    },
    {
        id: 'sdk',
        title: 'OpenTelemetry SDK — Zero-Code Instrumentation',
        description: 'A low-friction instrumentation layer so services could expose production telemetry without manually wiring every component.',
        problem: 'Every service team had to build its own OpenTelemetry setup from scratch. Most got it wrong or gave up.',
        whatChanged: 'Built an SDK that auto-instruments HTTP, DB, and other common patterns with zero code changes required.',
        interesting: 'Reduced manual instrumentation effort by 85% and got services onboarded in minutes instead of days.',
        evidence: ['OpenTelemetry', 'Python', 'Auto-instrumentation', 'HTTP + DB', 'Metrics / traces / logs'],
        link: null,
    },
]

export default function SelectedWork() {
    return (
        <section id="work" className="py-24 px-6 relative section-divider">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                    className="mb-12"
                >
                    <span className="section-label">[Selected Work]</span>
                    <h2
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                    >
                        What I've built
                    </h2>
                </motion.div>

                <div className="space-y-5">
                    {works.map((work, i) => (
                        <motion.div
                            key={work.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ type: 'spring', duration: 0.5, delay: i * 0.08, bounce: 0 }}
                            className="card p-6 sm:p-8 group"
                        >
                            <h3
                                className="text-xl font-bold mb-2 transition-colors duration-150"
                                style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                            >
                                {work.title}
                            </h3>
                            <p
                                className="text-sm leading-relaxed mb-5"
                                style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}
                            >
                                {work.description}
                            </p>

                            {/* Problem / What Changed / Interesting */}
                            <div className="space-y-3 mb-5">
                                <div>
                                    <span
                                        className="text-xs font-mono uppercase"
                                        style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.08em' }}
                                    >
                                        The problem
                                    </span>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                        {work.problem}
                                    </p>
                                </div>
                                <div>
                                    <span
                                        className="text-xs font-mono uppercase"
                                        style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.08em' }}
                                    >
                                        What I changed
                                    </span>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                        {work.whatChanged}
                                    </p>
                                </div>
                                <div>
                                    <span
                                        className="text-xs font-mono uppercase"
                                        style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.08em' }}
                                    >
                                        Interesting part
                                    </span>
                                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                        {work.interesting}
                                    </p>
                                </div>
                            </div>

                            {/* Evidence tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {work.evidence.map((tag) => (
                                    <span key={tag} className="tag tag-accent">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Link */}
                            {work.link && (
                                <a
                                    href={work.link}
                                    className="inline-flex items-center gap-1.5 text-sm font-mono transition-colors duration-150"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    Read the case study
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
