import { motion } from 'framer-motion'
import { Briefcase, Server, Shield, BarChart3, Cpu, Clock, Gauge, Layers } from 'lucide-react'

const experiences = [
    {
        role: 'Software Engineer',
        company: 'PhonePe',
        location: 'Bangalore, India',
        period: 'July 2025 — Present',
        type: 'Full-time',
        highlights: [
            {
                text: 'Scaled OBX across three production regions, making it the standard telemetry service for PhonePe\'s major cloud apps including PhonePe Cloud (PPEC), Identity RBAC, and Senzu',
                icon: BarChart3,
            },
            {
                text: 'Drove ingestion of all telemetry — metrics, traces, and logs into OBX, unifying previously siloed monitoring data under a single platform',
                icon: Layers,
            },
            {
                text: 'Reduced cross-component debugging time by 90% by enabling correlation of logs and traces across services using a shared trace ID',
                icon: Clock,
            },
            {
                text: 'Implemented Gunicorn/uWSGI fork-safety for OpenTelemetry metrics using post-fork meter re-initialization hooks and PID drift detection at SDK level',
                icon: Server,
            },
            {
                text: 'Added role based access control in OBX to provide team-level access control, enabling isolation of telemetry data across teams',
                icon: Shield,
            },
            {
                text: 'Primary point of contact for Senzu — bare metal provisioning orchestration for ~25,000 servers in on-prem data centers',
                icon: Cpu,
            },
            {
                text: 'Redesigned Senzu\'s firmware upload flow, cutting bare-metal firmware upgrade time from days to minutes',
                icon: Gauge,
            },
        ],
    },
    {
        role: 'Software Developer Intern',
        company: 'PhonePe',
        location: 'Bangalore, India',
        period: 'January 2025 — June 2025',
        type: 'Intern',
        highlights: [
            {
                text: 'Architected OBX from scratch — a 5-layer Observability as a Service platform covering all three telemetry pillars',
                icon: BarChart3,
            },
            {
                text: 'Built zero-code instrumentation SDK on OpenTelemetry, reducing manual instrumentation effort by 85%',
                icon: Shield,
            },
            {
                text: 'Wrote Go-based Nginx access log tailer for proxy-level request drop visibility',
                icon: Server,
            },
            {
                text: 'Implemented upstream/downstream service dependency graphs with live load percentages via OpenTelemetry request hooks',
                icon: Cpu,
            },
            {
                text: 'Automated Grafana dashboard generation on service registration and implemented SSO for Grafana, eliminating manual setup',
                icon: BarChart3,
            },
        ],
    },
]

function ExperienceCard({ exp, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative pl-8 sm:pl-10 pb-12 last:pb-0"
        >
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />

            {/* Timeline dot */}
            <div className={`absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 ${exp.type === 'Full-time'
                ? 'border-accent bg-accent-glow'
                : 'border-amber bg-amber/10'
                }`} />

            {/* Content */}
            <div className="bg-surface-raised border border-border rounded-xl p-6 hover:border-border/80 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {exp.role}
                    </h3>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full w-fit ${exp.type === 'Full-time'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-amber/10 text-amber'
                        }`}>
                        {exp.type}
                    </span>
                </div>
                <p className="text-sm text-text-secondary mb-1">
                    {exp.company} · {exp.location}
                </p>
                <p className="text-xs font-mono text-text-muted mb-5">{exp.period}</p>

                <ul className="space-y-3">
                    {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                            <h.icon size={16} className="text-text-muted mt-0.5 shrink-0" />
                            <span>{h.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="text-xs font-mono text-accent mb-3 block">// experience</span>
                    <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                        Where I've worked
                    </h2>
                    <p className="text-text-secondary mt-2">
                        From building observability infrastructure to orchestrating bare-metal provisioning at scale.
                    </p>
                </motion.div>

                <div>
                    {experiences.map((exp, i) => (
                        <ExperienceCard key={i} exp={exp} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
