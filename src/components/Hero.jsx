import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'

function GithubIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    )
}

function LinkedinIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    )
}

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 relative">
            {/* subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(var(--color-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="shrink-0"
                >
                    <div className="w-40 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border ring-2 ring-accent/20 ring-offset-2 ring-offset-[var(--color-bg)]">
                        <img
                            src="/profile_photo/image.jpeg"
                            alt="Priyanshu"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Text Content */}
                <div className="text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
                    >
                        <span className="text-text-primary">Priyanshu</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed"
                    >
                        Software Engineer at{' '}
                        <span className="text-text-primary font-medium">PhonePe</span>
                    </motion.p>

                    {/* Location + Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10"
                    >
                        <span className="text-sm font-mono text-text-muted leading-none py-0.5">📍 Bangalore, India</span>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/priyanshu2400"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg border border-border bg-surface-raised hover:border-accent hover:bg-accent-glow transition-all text-text-secondary hover:text-accent"
                            >
                                <GithubIcon size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/priyanshu2400/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg border border-border bg-surface-raised hover:border-accent hover:bg-accent-glow transition-all text-text-secondary hover:text-accent"
                            >
                                <LinkedinIcon size={18} />
                            </a>
                            <a
                                href="mailto:priyanshujha024@gmail.com"
                                className="p-2.5 rounded-lg border border-border bg-surface-raised hover:border-accent hover:bg-accent-glow transition-all text-text-secondary hover:text-accent"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.a
                        href="#experience"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="inline-flex flex-col items-center md:items-start gap-2 text-text-muted hover:text-text-secondary transition-colors"
                    >
                        <span className="text-xs font-mono">scroll down</span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowDown size={16} />
                        </motion.div>
                    </motion.a>
                </div>
            </div>
        </section>
    )
}
