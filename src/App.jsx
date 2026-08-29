import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import BlogCTA from './components/BlogCTA'
import BlogPage from './components/BlogList'
import Skills from './components/Skills'
import Education from './components/Education'
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

  return (
    <div className="min-h-screen">
      <Header onOpenBlog={openBlog} />

      {/* Main portfolio content */}
      <div className={blogOpen ? 'hidden' : ''}>
        <Hero />
        <Experience />
        <Projects />
        <BlogCTA onOpenBlog={openBlog} />
        <Skills />
        <Education />
        <Footer />
      </div>

      {/* Full-page blog overlay */}
      {blogOpen && (
        <div className="fixed inset-0 z-50 bg-surface overflow-y-auto">
          {/* Blog top bar */}
          <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-border">
            <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); closeBlog() }}
                className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
              >
                priyanshu<span className="text-accent">~</span>$
              </a>
              <button
                onClick={closeBlog}
                className="text-sm font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
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
