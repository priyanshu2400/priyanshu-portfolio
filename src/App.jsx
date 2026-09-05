import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SelectedWork from './components/SelectedWork'
import Experience from './components/Experience'
import WhatIDo from './components/WhatIDo'
import Skills from './components/Skills'
import BlogCTA from './components/BlogCTA'
import BlogPage from './components/BlogList'
import Footer from './components/Footer'

function App() {
  const [blogOpen, setBlogOpen] = useState(false)
  const [viewingPost, setViewingPost] = useState(null)

  // Handle hash-based blog routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      const blogPostMatch = hash.match(/^#blog\/(.+)$/)
      if (blogPostMatch) {
        setBlogOpen(true)
        setViewingPost(blogPostMatch[1])
      } else if (hash === '#blog' || hash === '#blog/') {
        setBlogOpen(true)
        setViewingPost(null)
      } else {
        setBlogOpen(false)
        setViewingPost(null)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const openBlog = () => {
    window.location.hash = 'blog'
    setBlogOpen(true)
    setViewingPost(null)
  }

  const selectBlogPost = (slug) => {
    window.location.hash = `blog/${slug}`
    setViewingPost(slug)
  }

  const backToBlogList = () => {
    window.location.hash = 'blog'
    setViewingPost(null)
  }

  const closeBlog = () => {
    window.location.hash = ''
    setBlogOpen(false)
    setViewingPost(null)
  }

  // Scroll reveal with IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (!x.isIntersecting) return
          setTimeout(() => x.target.classList.add('visible'), x.target.dataset.delay || 0)
          obs.unobserve(x.target)
        }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => {
      const s = Array.from(el.parentElement.querySelectorAll('.reveal'))
      if (!el.dataset.delay) el.dataset.delay = s.indexOf(el) * 90
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [blogOpen])

  return (
    <div className="min-h-screen">
      {/* Hide the main Header when blog overlay is open — blog has its own top bar */}
      {!blogOpen && <Header onOpenBlog={openBlog} />}

      {/* Main portfolio content */}
      <div className={blogOpen ? 'hidden' : ''}>
        <Hero />
        <SelectedWork />
        <Experience />
        <WhatIDo />
        <Skills />
        <BlogCTA onOpenBlog={openBlog} />
        <Footer />
      </div>

      {/* Full-page blog overlay */}
      {blogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'var(--color-surface)' }}>
          {/* Blog top bar */}
          <div className="sticky top-0 z-10" style={{ background: 'rgba(10,9,7,0.80)', backdropFilter: 'blur(16px) saturate(1.5)', borderBottom: '1px solid var(--color-border)' }}>
            <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); closeBlog() }}
                className="font-mono text-sm transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                priyanshu<span className="text-accent">~</span>$
              </a>
              <button
                onClick={closeBlog}
                className="text-sm font-mono transition-colors duration-150 flex items-center gap-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span className="hidden sm:inline">close</span>
                <span className="text-lg leading-none">×</span>
              </button>
            </div>
          </div>

          {/* Blog content — pt-14 accounts for the sticky header height */}
          <div className="max-w-3xl mx-auto px-6 pt-14 pb-20">
            <BlogPage
              isViewingPost={!!viewingPost}
              viewingSlug={viewingPost}
              onSelectPost={selectBlogPost}
              onBack={backToBlogList}
              onClose={closeBlog}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
