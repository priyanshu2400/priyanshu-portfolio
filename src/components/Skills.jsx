import { motion } from 'framer-motion'

const skillGroups = [
    {
        label: 'Languages',
        skills: ['Go', 'Python', 'C', 'C++', 'HTML', 'CSS', 'JavaScript'],
        color: 'accent',
    },
    {
        label: 'Frameworks',
        skills: ['React', 'Node.js', 'FastAPI', 'Tailwind CSS', 'Shadcn'],
        color: 'accent',
    },
    {
        label: 'Observability',
        skills: ['OpenTelemetry', 'Otel-Collector', 'Prometheus', 'Grafana', 'Loki', 'Jaeger', 'Kibana'],
        color: 'amber',
    },
    {
        label: 'Databases',
        skills: ['MySQL', 'MariaDB', 'SQLite', 'MongoDB', 'Elasticsearch'],
        color: 'green',
    },
    {
        label: 'DevOps & Infrastructure',
        skills: ['Docker', 'Podman', 'GitLab CI/CD', 'Nginx', 'Redfish API', 'Azure Container Apps'],
        color: 'green',
    },
    {
        label: 'Tools & Concepts',
        skills: ['Dify', 'RBAC', 'gRPC', 'REST APIs', 'Redis'],
        color: 'amber',
    },
]

function SkillTag({ skill, color }) {
    const colorMap = {
        accent: 'border-accent/20 text-accent hover:bg-accent/10',
        amber: 'border-amber/20 text-amber hover:bg-amber/10',
        green: 'border-green/20 text-green hover:bg-green/10',
    }

    return (
        <span
            className={`text-xs font-mono px-3 py-1.5 rounded-lg border bg-surface transition-all cursor-default ${colorMap[color]}`}
        >
            {skill}
        </span>
    )
}

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="text-xs font-mono text-accent mb-3 block">// skills</span>
                    <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                        Technical toolkit
                    </h2>
                </motion.div>

                <div className="space-y-8">
                    {skillGroups.map((group, gi) => (
                        <motion.div
                            key={group.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: gi * 0.08 }}
                        >
                            <h3 className="text-sm font-mono text-text-muted mb-3 uppercase tracking-wider">
                                {group.label}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <SkillTag key={skill} skill={skill} color={group.color} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
