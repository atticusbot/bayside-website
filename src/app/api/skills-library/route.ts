import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createHmac } from 'crypto'

function makeToken(email: string): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString('base64url')
  const secret = process.env.SKILLS_DOWNLOAD_SECRET ?? 'dev-secret-change-in-production'
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

function buildDownloadUrl(req: Request, token: string): string {
  const host = req.headers.get('host') ?? 'www.baysideai.co'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}/api/skills-library/download?token=${token}`
}

function buildEmailHtml(downloadUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Menlo,Monaco,Consolas,'Courier New',monospace;color:#07111f;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table role="presentation" width="100%" style="max-width:560px;" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #e5e5e5;">
              <p style="margin:0;font-size:11px;letter-spacing:0.14em;color:#888888;">BAYSIDE AI</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:32px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;color:#888888;">SKILLS LIBRARY</p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.8;">
                The download is ready. The link below is good for seven days.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <a href="${downloadUrl}"
                       style="display:inline-block;background:#5A7D54;color:#ffffff;text-decoration:none;font-family:Menlo,Monaco,Consolas,'Courier New',monospace;font-size:12px;letter-spacing:0.14em;padding:16px 28px;">
                      DOWNLOAD THE LIBRARY
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:32px 0 0;font-size:13px;line-height:1.9;color:#444444;">
                The bundle contains four skills: Proposal Drafter From Past Wins, Site Visit Notes To Project Record, Permit Submission Package Checklist, and Construction Administration Log Entry. Each folder includes a skill file, usage instructions, examples, and templates.
              </p>
              <p style="margin:20px 0 0;font-size:13px;line-height:1.9;color:#444444;">
                They run in Claude or ChatGPT. Open a new chat, attach the skill folder or paste the SKILL.md, and follow the prompt.
              </p>
              <p style="margin:20px 0 0;font-size:13px;line-height:1.9;color:#444444;">
                Questions or feedback: <a href="mailto:tyler@baysideai.co" style="color:#5A7D54;text-decoration:none;">tyler@baysideai.co</a>
              </p>
              <p style="margin:40px 0 0;padding-top:24px;border-top:1px solid #e5e5e5;font-size:11px;line-height:1.8;color:#aaaaaa;">
                You are receiving this because you requested the Bayside AI Skills Library. If you did not make this request, you can ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const email: string | undefined = body?.email?.trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) {
    console.error('RESEND_FROM_EMAIL is not set')
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
  }

  const token = makeToken(email)
  const downloadUrl = buildDownloadUrl(req, token)
  const resend = new Resend(resendKey)

  // Send transactional email
  const { error: emailError } = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: 'Bayside AI Skills Library — your download link',
    html: buildEmailHtml(downloadUrl),
    tags: [
      { name: 'category', value: 'skills-library' },
      { name: 'submitted_date', value: new Date().toISOString().split('T')[0] },
    ],
  })

  if (emailError) {
    console.error('Resend email send error:', emailError)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }

  // Add contact to Resend audience
  let audienceId = process.env.RESEND_AUDIENCE_ID ?? null

  if (!audienceId) {
    try {
      const { data: listData } = await resend.audiences.list()
      const audiences = (listData as unknown as { data: Array<{ id: string; name: string }> } | null)?.data
      const existing = audiences?.find((a) => a.name === 'skills-library-downloads')
      if (existing) {
        audienceId = existing.id
      } else {
        const { data: created } = await resend.audiences.create({ name: 'skills-library-downloads' })
        audienceId = (created as unknown as { id: string } | null)?.id ?? null
      }
    } catch (e) {
      console.error('Could not get or create Resend audience:', e)
    }
  }

  if (audienceId) {
    try {
      await resend.contacts.create({
        audienceId,
        email,
        unsubscribed: false,
      })
    } catch (e) {
      // Non-fatal: contact may already exist
      console.error('Resend contacts.create error:', e)
    }
  } else {
    console.warn('Skipping audience add: no audienceId available')
  }

  return NextResponse.json({ success: true })
}
