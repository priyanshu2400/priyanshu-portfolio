import { motion } from 'framer-motion'

const areas = [
    {
        label: 'Backend Systems',
        description: 'APIs, service integrations, concurrency, request lifecycles, and production debugging.',
    },
    {
        label: 'Observability',
        description: 'Metrics, traces, logs, telemetry pipelines, instrumentation, correlation, dashboards, and debugging production systems.',
    },
    {
        label: 'Infrastructure',
        description: 'Linux, containers, bare-metal systems, provisioning workflows, networking, and operational tooling.',
    },
    {
        label: 'Distributed Systems',
        description: 'Service dependencies, request propagation, multi-region systems, failure handling, and system behavior under production load.',
    },
    {
        label: 'Developer Tooling',
        description: 'Internal platforms that remove repetitive setup from application teams.',
    },
]

export default function WhatIDo() {
    return (
        <section className="py-24 px-6" style={{ background: 'var(--color-surface-raised)' }}>
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                    className="mb-12"
                >
                    <span className="section-label">[What I Work On]</span>
                    <h2
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                    >
                        Engineering areas
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {areas.map((area, i) => (
                        <motion.div
                            key={area.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', duration: 0.4, delay: i * 0.06, bounce: 0 }}
                            className="card p-5"
                        >
                            <h3
                                className="text-sm font-semibold mb-2"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                {area.label}
                            </h3>
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}
                            >
                                {area.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
