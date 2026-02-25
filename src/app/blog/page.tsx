import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import type { Metadata } from 'next'
import PostCard from './post-card'

export const metadata: Metadata = {
  title: 'Blog — Bayside AI',
  description: 'AI insights for independent hotel owners on the Maryland shore.',
}

interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
}

function getPosts(): PostMeta[] {
  const contentDir = path.join(process.cwd(), 'src/content/blog')

  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))

  return files
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const source = fs.readFileSync(path.join(contentDir, file), 'utf8')
      const { data } = matter(source)
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a1e1a', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '120px', paddingBottom: '80px' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.8rem',
            color: '#3dffa0',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'inline-block',
            marginBottom: '48px',
            opacity: 0.8,
          }}
        >
          ← BAYSIDE AI
        </Link>

        <h1
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#3dffa0',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            lineHeight: 1.1,
          }}
        >
          The Intel
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-plus-jakarta)',
            fontSize: '1.1rem',
            color: '#e8f5f0',
            opacity: 0.7,
            marginBottom: '64px',
            maxWidth: '520px',
          }}
        >
          AI insights for independent hotel owners on the Maryland shore. No fluff. Just things that move the needle.
        </p>

        {/* Post list */}
        {posts.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-plus-jakarta)', color: '#e8f5f0', opacity: 0.5 }}>
            Articles coming soon.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {posts.map(post => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
