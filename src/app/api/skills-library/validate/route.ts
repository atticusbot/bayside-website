import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { SKILLS_LIBRARY_CODES } from '@/lib/skills-library-codes'

function makeToken(firm: string): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000
  const payload = Buffer.from(JSON.stringify({ firm, exp })).toString('base64url')
  const secret = process.env.SKILLS_DOWNLOAD_SECRET ?? 'dev-secret-change-in-production'
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

function buildDownloadUrl(req: Request, token: string): string {
  const host = req.headers.get('host') ?? 'www.baysideai.co'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}/api/skills-library/download?token=${token}`
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const code = (body?.code ?? '').trim().toLowerCase()

  if (!code) {
    return NextResponse.json({ error: 'Code is required.' }, { status: 400 })
  }

  const firmName = SKILLS_LIBRARY_CODES[code]
  if (!firmName) {
    return NextResponse.json({ error: 'Code not recognized.' }, { status: 401 })
  }

  console.log(
    JSON.stringify({
      event: 'skills-library-validate',
      firm: firmName,
      code,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') ?? '',
    })
  )

  const token = makeToken(firmName)
  const downloadUrl = buildDownloadUrl(req, token)

  return NextResponse.json({ firmName, downloadUrl })
}
