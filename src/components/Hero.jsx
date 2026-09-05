import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { useState } from 'react'
import { links } from '../config'

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
    const [copied, setCopied] = useState(false)

    const handleEmail = (e) => {
        e.preventDefault()
        const email = links.email
        // Try opening mail client via location change
        const link = document.createElement('a')
        link.href = `mailto:${email}`
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        // Fallback: copy to clipboard after a short delay
        setTimeout(() => {
            navigator.clipboard.writeText(email).then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            }).catch(() => { })
        }, 300)
    }

    return (
        <section className="h-dvh md:min-h-dvh grid place-items-center px-6 pt-4 pb-4 md:pt-0 md:pb-0 relative overflow-hidden">
            {/* Hero orb */}
            <div className="hero-orb" />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(var(--color-text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-tertiary) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto w-full">
                <div className="flex flex-col items-center md:flex-row md:items-center gap-6 md:gap-14">
                    {/* Photo — top on mobile, right on desktop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', duration: 0.6, delay: 0.2, bounce: 0 }}
                        className="shrink-0 md:order-last"
                    >
                        <div
                            className="w-24 sm:w-36 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden"
                            style={{
                                border: '1px solid var(--color-border-medium)',
                                boxShadow: '0 0 40px rgba(212, 160, 60, 0.08)',
                            }}
                        >
                            <img
                                src="/profile_photo/image.jpeg"
                                alt="Priyanshu Jha"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Text content — below photo on mobile, left on desktop */}
                    <div className="flex-1 text-center md:text-left">
                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'spring', duration: 0.6, delay: 0.1, bounce: 0 }}
                            className="display-headline mb-3 md:mb-6"
                        >
                            <span className="hl-muted">I build systems that work in </span>
                            <span className="hl-bright">production</span>
                            <span className="hl-muted"> and </span>
                            <span className="hl-bright">observability tools</span>
                            <span className="hl-muted"> so I know when they don't. 😉</span>
                        </motion.h1>

                        {/* Supporting line */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'spring', duration: 0.6, delay: 0.15, bounce: 0 }}
                            className="text-sm sm:text-base md:text-lg mb-3 md:mb-8 leading-relaxed"
                            style={{ textWrap: 'balance', color: 'var(--color-text-secondary)' }}
                        >
                            Software Engineer at <span className="hl-bright">PhonePe</span> working on observability, infrastructure tooling, and bare-metal provisioning at production scale. I mostly work with Go, Python, OpenTelemetry, Linux, and distributed systems.
                        </motion.p>

                        {/* CTA links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'spring', duration: 0.6, delay: 0.25, bounce: 0 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-3 md:mb-8"
                        >
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <GithubIcon size={16} />
                                GitHub
                            </a>
                            <a
                                href={links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <LinkedinIcon size={16} />
                                LinkedIn
                            </a>
                            <a
                                href={`mailto:${links.email}`}
                                className="btn btn-secondary"
                                onClick={handleEmail}
                                style={{ position: 'relative' }}
                            >
                                <Mail size={16} />
                                {copied ? 'Copied!' : 'Email'}
                            </a>
                            <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                <Download size={16} />
                                Resume
                            </a>
                        </motion.div>

                        {/* Tech stack line */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-xs font-mono"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            <span>Go</span>
                            <span style={{ color: 'var(--color-border-medium)' }}>·</span>
                            <span>Python</span>
                            <span style={{ color: 'var(--color-border-medium)' }}>·</span>
                            <span>OpenTelemetry</span>
                            <span style={{ color: 'var(--color-border-medium)' }}>·</span>
                            <span>Linux</span>
                            <span style={{ color: 'var(--color-border-medium)' }}>·</span>
                            <span>Distributed Systems</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator — absolutely positioned relative to section so it doesn't affect content centering */}
            <motion.a
                href="#work"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center transition-colors duration-150 z-20"
                style={{ color: 'var(--color-text-muted)' }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ArrowDown size={16} />
                </motion.div>
            </motion.a>
        </section>
    )
}
