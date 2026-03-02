import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const name = slug.replace(/\.html$/, '')

  try {
    const filePath = join(process.cwd(), 'public', 'audits', `${name}.html`)
    const html = readFileSync(filePath, 'utf-8')
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
