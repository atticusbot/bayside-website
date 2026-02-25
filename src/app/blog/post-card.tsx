'use client'

import Link from 'next/link'

interface PostCardProps {
  slug: string
  title: string
  date: string
  excerpt: string
}

export default function PostCard({ slug, title, date, excerpt }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          padding: '36px 40px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(61,255,160,0.08)',
          borderRadius: '8px',
          marginBottom: '16px',
          transition: 'border-color 0.2s, background-color 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,255,160,0.3)';
          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(61,255,160,0.04)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,255,160,0.08)';
          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)';
        }}
      >
        {date && (
          <time
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.7rem',
              color: '#3dffa0',
              letterSpacing: '0.1em',
              opacity: 0.7,
              display: 'block',
              marginBottom: '12px',
            }}
          >
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: '#e8f5f0',
            fontWeight: 700,
            marginBottom: '12px',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        {excerpt && (
          <p
            style={{
              fontFamily: 'var(--font-plus-jakarta)',
              fontSize: '1rem',
              color: '#e8f5f0',
              opacity: 0.65,
              lineHeight: 1.6,
              marginBottom: '16px',
            }}
          >
            {excerpt}
          </p>
        )}
        <span
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.75rem',
            color: '#3dffa0',
            letterSpacing: '0.05em',
          }}
        >
          READ MORE →
        </span>
      </article>
    </Link>
  )
}
