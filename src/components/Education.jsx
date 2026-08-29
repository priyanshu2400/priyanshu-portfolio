import { motion } from 'framer-motion'
import { GraduationCap, Trophy } from 'lucide-react'

export default function Education() {
    return (
        <section className="py-24 px-6 bg-surface-raised/30">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="text-xs font-mono text-accent mb-3 block">// education</span>
                    <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                        Background
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-5">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-surface-raised border border-border rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                <GraduationCap size={20} />
                            </div>
                            <h3 className="text-base font-semibold text-text-primary">Education</h3>
                        </div>
                        <p className="text-sm text-text-primary font-medium mb-1">
                            B.E. Computer Science
                        </p>
                        <p className="text-sm text-text-secondary mb-1">
                            Bangalore Institute of Technology
                        </p>
                        <p className="text-xs font-mono text-text-muted mb-3">
                            Dec 2021 — Jun 2025
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-overlay border border-border-subtle">
                            <span className="text-xs text-text-muted">CGPA</span>
                            <span className="text-sm font-bold font-mono text-accent">8.75</span>
                            <span className="text-xs text-text-muted">/10</span>
                        </div>
                    </motion.div>

                    {/* Competitive Programming */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-surface-raised border border-border rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-amber/10 text-amber">
                                <Trophy size={20} />
                            </div>
                            <h3 className="text-base font-semibold text-text-primary">Competitive Programming</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-text-primary font-medium">CodeChef</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber/10 text-amber">
                                        ★★★ 3-star
                                    </span>
                                    <span className="text-xs font-mono text-text-muted">
                                        max 1740
                                    </span>
                                </div>
                                <p className="text-xs text-text-muted mt-1">
                                    Global Rank 19 in Starter 113 out of 25,000+
                                </p>
                            </div>

                            <div className="h-px bg-border-subtle" />

                            <div>
                                <p className="text-sm text-text-primary font-medium">LeetCode</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber/10 text-amber">
                                        Top 11%
                                    </span>
                                    <span className="text-xs font-mono text-text-muted">
                                        max 1777
                                    </span>
                                </div>
                                <p className="text-xs text-text-muted mt-1">
                                    700+ problems solved
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
