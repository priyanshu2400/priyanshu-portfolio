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
                transition={{ duration: 0.5 }}
                className="mb-14"
            >
                <h1 className="text-3xl sm:text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-4">
                    Writing
                </h1>
                <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
                    Deep dives into systems engineering, observability, and things I've learned building at scale.
                </p>
            </motion.div>

            <div className="space-y-3">
                {posts.map((post, i) => (
                    <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        onClick={() => onSelect(post.slug)}
                        className="group relative border border-border rounded-xl p-6 hover:border-accent/30 hover:bg-surface-raised/50 transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                                    {post.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface-overlay text-text-muted border border-border-subtle"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
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
                                <span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1">
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
                <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!post) {
        return (
            <div className="text-center py-32">
                <p className="text-text-muted text-lg">Post not found.</p>
                <button onClick={onBack} className="text-accent text-sm mt-4 hover:underline font-mono">
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
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-10 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono">all posts</span>
            </button>

            {/* Post header */}
            <header className="mb-12 pb-10 border-b border-border">
                <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text-primary tracking-tight mb-5 leading-tight">
                    {post.title}
                </h1>
                <p className="text-base text-text-secondary leading-relaxed mb-6 max-w-2xl">
                    {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted">
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
                        <span
                            key={tag}
                            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20"
                        >
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
            <div className="mt-20 pt-8 border-t border-border">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
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
