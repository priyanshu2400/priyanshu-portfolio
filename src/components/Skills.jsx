import { motion } from 'framer-motion'

const tiers = [
    {
        label: 'Core',
        skills: [
            { name: 'Go', evidence: 'Nginx log tailer, PPEC firmware workflow, production tooling' },
            { name: 'Python', evidence: 'OpenTelemetry SDK, application-side instrumentation, metrics pipelines' },
            { name: 'Linux', evidence: 'Infrastructure environment, eBPF experiments, networking / observability' },
            { name: 'Distributed Systems', evidence: 'Multi-region telemetry, service dependencies, request propagation' },
            { name: 'Observability', evidence: 'OBX, metrics / traces / logs, dashboards, production debugging' },
            { name: 'OpenTelemetry', evidence: 'OBX, zero-code SDK, trace/log correlation, fork-safe metrics' },
            { name: 'Backend Engineering', evidence: 'APIs, service integrations, concurrency, production debugging' },
        ],
    },
    {
        label: 'Observability & Monitoring',
        skills: [
            { name: 'Prometheus', evidence: 'Metrics collection and storage in OBX' },
            { name: 'Grafana', evidence: 'Automated dashboard generation, SSO integration' },
            { name: 'Jaeger', evidence: 'Distributed tracing backend' },
            { name: 'Loki', evidence: 'Log aggregation pipeline' },
            { name: 'Kibana', evidence: 'Log exploration and search' },
        ],
    },
    {
        label: 'Infrastructure',
        skills: [
            { name: 'Docker', evidence: 'Containerized deployments' },
            { name: 'Kubernetes', evidence: 'Container orchestration, service deployment, pod management' },
            { name: 'Nginx', evidence: 'Access log tailing, proxy-level observability' },
            { name: 'Redfish API', evidence: 'Bare-metal firmware management' },
            { name: 'CI/CD', evidence: 'GitLab CI/CD pipelines' },
            { name: 'Bare-metal systems', evidence: 'PPEC provisioning across 25K+ servers' },
        ],
    },
    {
        label: 'Backend',
        skills: [
            { name: 'REST APIs', evidence: 'Service integrations, OBX API layer' },
            { name: 'gRPC', evidence: 'Inter-service communication' },
            { name: 'FastAPI', evidence: 'Python service backends' },
            { name: 'Node.js', evidence: 'Application backends' },
            { name: 'MySQL', evidence: 'Relational data storage' },
            { name: 'Elasticsearch', evidence: 'Search and log indexing' },
            { name: 'Redis', evidence: 'Caching layer' },
        ],
    },
]

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-6 relative section-divider">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                    className="mb-12"
                >
                    <span className="section-label">[Skills]</span>
                    <h2
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                    >
                        Technical areas
                    </h2>
                    <p className="mt-2" style={{ color: 'var(--color-text-secondary)', textWrap: 'balance' }}>
                        Skills backed by production work, not just listed.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {tiers.map((tier, ti) => (
                        <motion.div
                            key={tier.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', duration: 0.4, delay: ti * 0.06, bounce: 0 }}
                        >
                            <h3
                                className="text-xs font-mono mb-3 uppercase"
                                style={{ color: 'var(--color-text-muted)', letterSpacing: '0.10em' }}
                            >
                                {tier.label}
                            </h3>
                            <div className="space-y-2">
                                {tier.skills.map((skill) => (
                                    <div key={skill.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                        <span
                                            className="text-sm font-medium shrink-0"
                                            style={{ color: 'var(--color-text-primary)', minWidth: 140 }}
                                        >
                                            {skill.name}
                                        </span>
                                        <span
                                            className="text-xs"
                                            style={{ color: 'var(--color-text-muted)' }}
                                        >
                                            → {skill.evidence}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
