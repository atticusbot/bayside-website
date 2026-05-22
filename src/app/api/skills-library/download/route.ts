import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return new NextResponse('Missing download token.', { status: 400 })
  }

  const dotIndex = token.lastIndexOf('.')
  if (dotIndex === -1) {
    return new NextResponse('Malformed download token.', { status: 400 })
  }

  const payload = token.slice(0, dotIndex)
  const sig = token.slice(dotIndex + 1)

  const secret = process.env.SKILLS_DOWNLOAD_SECRET ?? 'dev-secret-change-in-production'
  const expected = createHmac('sha256', secret).update(payload).digest('base64url')

  if (sig !== expected) {
    return new NextResponse('Invalid download token.', { status: 401 })
  }

  let parsed: { exp: number }
  try {
    parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'))
  } catch {
    return new NextResponse('Malformed download token.', { status: 400 })
  }

  if (!parsed.exp || Date.now() > parsed.exp) {
    const host = req.headers.get('host') ?? 'www.baysideai.co'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    return new NextResponse(
      `This download link has expired. Request a new one at ${protocol}://${host}/skills-library`,
      { status: 410 }
    )
  }

  const blobUrl = process.env.SKILLS_BUNDLE_URL
  if (!blobUrl) {
    console.error('SKILLS_BUNDLE_URL is not set')
    return new NextResponse('Download is not available yet.', { status: 503 })
  }

  return NextResponse.redirect(blobUrl, { status: 302 })
}
