import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const dir = join(process.cwd(), 'public', 'audits')
  const files = readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'ocean-lodge-proposal.html')
  return files.map(f => ({ slug: f.replace(/\.html$/, '') }))
}

export default async function AuditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const filePath = join(process.cwd(), 'public', 'audits', `${slug}.html`)
    const html = readFileSync(filePath, 'utf-8')
    // Inject into a bare page — the audit HTML is a full document
    return (
      <div
        style={{ all: 'unset' }}
        dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE[^>]*>|<\/?html[^>]*>|<\/?head[^>]*>[\s\S]*?<\/head>|<\/?body[^>]*>/gi, '') }}
      />
    )
  } catch {
    notFound()
  }
}
