import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-border">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    {/* Terminal-style sign off */}
                    <div className="inline-block bg-surface-raised border border-border rounded-lg px-4 sm:px-6 py-4 mb-6 font-mono text-xs sm:text-sm">
                        <p className="text-text-muted">
                            <span className="text-accent">$</span> echo "Thanks for visiting"
                        </p>
                        <p className="text-text-primary mt-1">Thanks for visiting</p>
                        <p className="text-text-muted mt-1">
                            <span className="text-accent">$</span> <span className="animate-pulse">_</span>
                        </p>
                    </div>

                    <p className="text-xs text-text-muted flex items-center justify-center gap-1.5">
                        Built with <Heart size={12} className="text-red-500" /> and curiosity
                    </p>
                    <p className="text-xs text-text-muted mt-1 font-mono">
                        © 2026 Priyanshu
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}
