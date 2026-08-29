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

    // Close mobile menu on hash change
    useEffect(() => {
        setMobileOpen(false)
    }, [])

    const links = [
        { label: 'experience', href: '#experience' },
        { label: 'projects', href: '#projects' },
        { label: 'skills', href: '#skills' },
    ]

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                    ? 'bg-surface/80 backdrop-blur-xl border-b border-border'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                <a href="#" className="font-mono text-sm text-text-secondary hover:text-accent transition-colors">
                    priyanshu<span className="text-accent">~</span>$
                </a>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm text-text-muted hover:text-text-primary transition-colors font-mono"
                        >
                            ./{link.label}
                        </a>
                    ))}
                    <button
                        onClick={onOpenBlog}
                        className="text-sm text-text-muted hover:text-text-primary transition-colors font-mono"
                    >
                        ./blog
                    </button>
                    <a
                        href="mailto:priyanshujha024@gmail.com"
                        className="text-sm text-accent hover:text-blue-400 transition-colors font-mono"
                    >
                        contact
                    </a>
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-text-muted hover:text-text-primary transition-colors p-1"
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
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-border bg-surface/95 backdrop-blur-xl overflow-hidden"
                    >
                        <nav className="px-6 py-4 flex flex-col gap-3">
                            {links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm text-text-muted hover:text-text-primary transition-colors font-mono py-1"
                                >
                                    ./{link.label}
                                </a>
                            ))}
                            <button
                                onClick={() => { onOpenBlog(); setMobileOpen(false) }}
                                className="text-sm text-text-muted hover:text-text-primary transition-colors font-mono py-1 text-left"
                            >
                                ./blog
                            </button>
                            <a
                                href="mailto:priyanshujha024@gmail.com"
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-accent hover:text-blue-400 transition-colors font-mono py-1"
                            >
                                contact
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
