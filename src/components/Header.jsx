import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Header({ onOpenBlog }) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const links = [
        { label: 'work', href: '#work' },
    ]

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
            className={`nav ${scrolled ? 'scrolled' : ''}`}
        >
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                <a href="#" className="font-mono text-sm transition-colors duration-150" style={{ color: 'var(--color-text-secondary)' }}>
                    priyanshu<span style={{ color: 'var(--color-accent)' }}>~</span>$
                </a>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm transition-colors duration-150 font-mono"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            ./{link.label}
                        </a>
                    ))}
                    <button
                        onClick={onOpenBlog}
                        className="text-sm transition-colors duration-150 font-mono"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        ./notes
                    </button>
                    <a
                        href="https://github.com/priyanshu2400"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors duration-150 font-mono"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        github
                    </a>
                    <a
                        href="/resume.pdf"
                        download
                        className="btn btn-primary btn-sm"
                    >
                        resume
                    </a>
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden transition-colors duration-150 p-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                        className="md:hidden border-t overflow-hidden"
                        style={{ borderColor: 'var(--color-border)', background: 'rgba(10, 9, 7, 0.95)', backdropFilter: 'blur(16px)' }}
                    >
                        <nav className="px-6 py-4 flex flex-col gap-3">
                            {links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm transition-colors duration-150 font-mono py-1"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    ./{link.label}
                                </a>
                            ))}
                            <button
                                onClick={() => { onOpenBlog(); setMobileOpen(false) }}
                                className="text-sm transition-colors duration-150 font-mono py-1 text-left"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                ./notes
                            </button>
                            <a
                                href="https://github.com/priyanshu2400"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="text-sm transition-colors duration-150 font-mono py-1"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                github
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                onClick={() => setMobileOpen(false)}
                                className="btn btn-primary btn-sm w-fit mt-1"
                            >
                                resume
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
