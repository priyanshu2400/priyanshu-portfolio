import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function BlogCTA({ onOpenBlog }) {
    return (
        <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative border border-accent/20 rounded-2xl p-8 sm:p-10 overflow-hidden"
                >
                    {/* Subtle glow background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />

                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                            <BookOpen size={24} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                                Read my writing
                            </h2>
                            <p className="text-sm text-text-secondary leading-relaxed mb-4 sm:mb-0">
                                Deep dives into distributed systems, eBPF observability, multi-process Python metrics, and lessons from building at scale.
                            </p>
                        </div>
                        <button
                            onClick={onOpenBlog}
                            className="shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dim transition-colors group"
                        >
                            Explore posts
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
