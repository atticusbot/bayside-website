import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import React from 'react'

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content/blog')
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))
  return files.map(f => ({ slug: f.replace(/\.mdx$/, '') }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const contentDir = path.join(process.cwd(), 'src/content/blog')
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return {}
  const source = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(source)
  return {
    title: `${data.title} — Bayside AI`,
    description: data.excerpt || '',
  }
}

function renderBlock(block: string, index: number) {
  const trimmed = block.trim()

  if (trimmed.startsWith('## ')) {
    return (
      <h2 key={index} style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
        color: '#3dffa0',
        fontWeight: 700,
        marginTop: '48px',
        marginBottom: '16px',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      }}>
        {trimmed.replace(/^## /, '')}
      </h2>
    )
  }

  if (trimmed.startsWith('### ')) {
    return (
      <h3 key={index} style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: '1rem',
        color: '#e8f5f0',
        fontWeight: 700,
        marginTop: '32px',
        marginBottom: '12px',
        letterSpacing: '0.02em',
      }}>
        {trimmed.replace(/^### /, '')}
      </h3>
    )
  }

  if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
    const items = trimmed.split('\n').filter(l => l.trim())
    return (
      <ul key={index} style={{
        fontFamily: 'var(--font-plus-jakarta)',
        fontSize: '1.05rem',
        color: '#e8f5f0',
        lineHeight: 1.8,
        marginBottom: '24px',
        opacity: 0.88,
        paddingLeft: '24px',
      }}>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: '8px' }}>
            {renderInline(item.replace(/^[-*]\s+/, ''))}
          </li>
        ))}
      </ul>
    )
  }

  if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
    return (
      <p key={index} style={{
        fontFamily: 'var(--font-plus-jakarta)',
        fontSize: '1.05rem',
        color: '#e8f5f0',
        lineHeight: 1.75,
        marginBottom: '20px',
        fontWeight: 700,
      }}>
        {trimmed.replace(/\*\*/g, '')}
      </p>
    )
  }

  return (
    <p key={index} style={{
      fontFamily: 'var(--font-plus-jakarta)',
      fontSize: '1.05rem',
      color: '#e8f5f0',
      lineHeight: 1.8,
      marginBottom: '24px',
      opacity: 0.88,
    }}>
      {renderInline(trimmed)}
    </p>
  )
}

function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let match
  let keyIdx = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index))
    }
    const token = match[0]
    if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(<strong key={keyIdx++}>{token.slice(2, -2)}</strong>)
    } else {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token)
      if (linkMatch) {
        tokens.push(
          <a key={keyIdx++} href={linkMatch[2]} style={{ color: '#3dffa0', textDecoration: 'underline' }}>
            {linkMatch[1]}
          </a>
        )
      }
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex))
  }

  return tokens
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const contentDir = path.join(process.cwd(), 'src/content/blog')
  const filePath = path.join(contentDir, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) notFound()

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  const paragraphs = content.split('\n\n').filter(p => p.trim())

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a1e1a', padding: '0 1rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', paddingTop: '120px', paddingBottom: '100px' }}>

        <Link
          href="/blog"
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.75rem',
            color: '#3dffa0',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            display: 'inline-block',
            marginBottom: '56px',
            opacity: 0.7,
          }}
        >
          ← THE INTEL
        </Link>

        {data.date && (
          <time style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.7rem',
            color: '#3dffa0',
            letterSpacing: '0.12em',
            opacity: 0.65,
            display: 'block',
            marginBottom: '20px',
          }}>
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
            })}
          </time>
        )}

        <h1 style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          color: '#e8f5f0',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '48px',
          borderBottom: '1px solid rgba(61,255,160,0.15)',
          paddingBottom: '40px',
        }}>
          {data.title}
        </h1>

        <article>
          {paragraphs.map((block, i) => renderBlock(block, i))}
        </article>

        {/* CTA */}
        <div style={{
          marginTop: '64px',
          padding: '40px',
          backgroundColor: 'rgba(61,255,160,0.06)',
          border: '1px solid rgba(61,255,160,0.2)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.8rem',
            color: '#3dffa0',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>
            FREE AUDIT
          </p>
          <p style={{
            fontFamily: 'var(--font-plus-jakarta)',
            fontSize: '1.1rem',
            color: '#e8f5f0',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}>
            Find out what your online presence is costing you — and what it could earn you.
          </p>
          <a
            href="https://baysideai.co/#audit"
            style={{
              fontFamily: 'var(--font-space-mono)',
              backgroundColor: '#3dffa0',
              color: '#0a1e1a',
              padding: '14px 32px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              display: 'inline-block',
            }}
          >
            GET YOUR FREE AUDIT →
          </a>
        </div>

      </div>
    </main>
  )
}
