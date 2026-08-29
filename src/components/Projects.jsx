import { motion } from 'framer-motion'
import { ExternalLink, MessageSquare, Zap, Layers } from 'lucide-react'

function GithubIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    )
}

const projects = [
    {
        title: 'OBX — Observability as a Service',
        description:
            'Architected from scratch at PhonePe: a 5-layer platform unifying metrics, traces, and logs across three production regions for internal cloud applications.',
        metrics: [
            { label: 'debugging time', value: '90%↓' },
            { label: 'instrumentation effort', value: '85%↓' },
            { label: 'servers monitored', value: '25K+' },
        ],
        tags: ['Go', 'OpenTelemetry', 'Grafana', 'Prometheus', 'Loki', 'Jaeger'],
        icon: Layers,
        link: null,
        github: null,
        accent: 'accent',
    },
    {
        title: 'Zero-Code Instrumentation SDK',
        description:
            'Built an SDK on top of OpenTelemetry that lets services onboard to production-grade metrics, traces, and logs in minutes — no code changes required.',
        metrics: [
            { label: 'manual effort saved', value: '85%' },
            { label: 'onboarding time', value: 'minutes' },
        ],
        tags: ['Python', 'OpenTelemetry', 'SDK', 'Gunicorn', 'uWSGI'],
        icon: Zap,
        link: null,
        github: null,
        accent: 'amber',
    },
    {
        title: 'Placement Cell Website',
        description:
            'Full-stack application for placement management with real-time job notifications, single-click applications, and an AI chatbot for placement queries.',
        metrics: [
            { label: 'submission time', value: '50%↓' },
            { label: 'user engagement', value: '30%↑' },
        ],
        tags: ['React', 'Redux', 'Material UI', 'Node.js', 'MongoDB', 'JWT', 'Gemini AI'],
        icon: MessageSquare,
        link: null,
        github: 'https://github.com/priyanshu2400/training-placement-client',
        accent: 'green',
    },
]

function ProjectCard({ project, index }) {
    const accentMap = {
        accent: {
            border: 'hover:border-accent/30',
            tag: 'bg-accent/10 text-accent',
            icon: 'text-accent',
            metric: 'text-accent',
        },
        amber: {
            border: 'hover:border-amber/30',
            tag: 'bg-amber/10 text-amber',
            icon: 'text-amber',
            metric: 'text-amber',
        },
        green: {
            border: 'hover:border-green/30',
            tag: 'bg-green/10 text-green',
            icon: 'text-green',
            metric: 'text-green',
        },
    }

    const a = accentMap[project.accent]

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-surface-raised border border-border rounded-xl p-6 transition-all duration-300 group ${a.border}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg bg-surface-overlay ${a.icon}`}>
                    <project.icon size={20} />
                </div>
                <div className="flex items-center gap-2">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-overlay transition-all"
                        >
                            <GithubIcon size={16} />
                        </a>
                    )}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-overlay transition-all"
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>

            <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {project.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && (
                <div className="flex gap-4 mb-4 pb-4 border-b border-border-subtle">
                    {project.metrics.map((m, i) => (
                        <div key={i} className="text-center">
                            <div className={`text-lg font-bold font-mono ${a.metric}`}>{m.value}</div>
                            <div className="text-xs text-text-muted">{m.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className={`text-xs font-mono px-2 py-1 rounded-md ${a.tag}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-6 bg-surface-raised/30">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="text-xs font-mono text-accent mb-3 block">// projects</span>
                    <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                        What I've built
                    </h2>
                    <p className="text-text-secondary mt-2">
                        Systems that run in production, not just on GitHub.
                    </p>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
