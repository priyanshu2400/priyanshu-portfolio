import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

function BlogList({ onSelect }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('/blogs/manifest.json')
            .then((res) => res.json())
            .then(setPosts)
            .catch(console.error)
    }, [])

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                className="mb-14"
            >
                <h1
                    className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
                    style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                >
                    Engineering Notes
                </h1>
                <p
                    className="text-lg leading-relaxed max-w-xl"
                    style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}
                >
                    Notes from things I broke, fixed, measured, and learned while building production systems.
                </p>
            </motion.div>

            <div className="space-y-3">
                {posts.map((post, i) => (
                    <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', duration: 0.4, delay: i * 0.06, bounce: 0 }}
                        onClick={() => onSelect(post.slug)}
                        className="group relative rounded-xl p-6 cursor-pointer transition-[border-color,background-color] duration-200"
                        style={{
                            border: '1px solid var(--color-border)',
                            background: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-accent)'
                            e.currentTarget.style.background = 'var(--color-surface-card)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h2
                                    className="text-xl font-semibold mb-2 transition-colors duration-150"
                                    style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                                >
                                    {post.title}
                                </h2>
                                <p
                                    className="text-sm leading-relaxed mb-4 line-clamp-2"
                                    style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}
                                >
                                    {post.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={12} />
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        {post.readTime}
                                    </span>
                                </div>
                                <span
                                    className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    read post <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    )
}

function BlogPost({ slug, onBack }) {
    const [post, setPost] = useState(null)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/blogs/manifest.json')
            .then((res) => res.json())
            .then((posts) => {
                const found = posts.find((p) => p.slug === slug)
                setPost(found)
                return fetch(`/blogs/${slug}.md`)
            })
            .then((res) => res.text())
            .then(setContent)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [slug])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <div
                    className="w-6 h-6 border-2 rounded-full animate-spin"
                    style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
                    aria-label="Loading"
                    role="status"
                />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-32">
                <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>Post not found.</p>
                <button
                    onClick={onBack}
                    className="text-sm mt-4 hover:underline font-mono"
                    style={{ color: 'var(--color-accent)' }}
                >
                    ← back to all posts
                </button>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Back button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm transition-colors duration-150 mb-10 group"
                style={{ color: 'var(--color-text-muted)' }}
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-150" />
                <span className="font-mono">all posts</span>
            </button>

            {/* Post header */}
            <header className="mb-12 pb-10" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h1
                    className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight mb-5 leading-tight"
                    style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}
                >
                    {post.title}
                </h1>
                <p
                    className="text-base leading-relaxed mb-6 max-w-2xl"
                    style={{ color: 'var(--color-text-secondary)', textWrap: 'pretty' }}
                >
                    {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1.5 font-mono">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                        <Clock size={14} />
                        {post.readTime}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                    {post.tags.map((tag) => (
                        <span key={tag} className="tag tag-accent">
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            {/* Markdown content */}
            <article className="blog-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {content}
                </ReactMarkdown>
            </article>

            {/* Bottom nav */}
            <div className="mt-20 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm transition-colors duration-150 group"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-150" />
                    <span className="font-mono">back to all posts</span>
                </button>
            </div>
        </motion.div>
    )
}

export default function BlogPage({ isViewingPost, viewingSlug, onSelectPost, onBack }) {
    if (isViewingPost && viewingSlug) {
        return <BlogPost slug={viewingSlug} onBack={onBack} />
    }
    return <BlogList onSelect={onSelectPost} />
}
