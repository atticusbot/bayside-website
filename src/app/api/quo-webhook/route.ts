import { NextRequest, NextResponse } from 'next/server'

const QUO_API_KEY  = process.env.QUO_API_KEY!
const QUO_FROM_NUMBER = process.env.QUO_FROM_NUMBER! // e.g. +14433735527
const CAL_LINK = 'https://cal.com/bayside-ai/15min'

const SMS_BODY = `Hey, this is Tyler with Bayside AI — sorry I missed you! I'll call you back shortly. Feel free to text me here or book a time that works: ${CAL_LINK}`

async function sendSMS(to: string) {
  const res = await fetch('https://api.openphone.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': QUO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: SMS_BODY,
      from: QUO_FROM_NUMBER,
      to: [to],
    }),
  })
  return res.ok
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const type = body?.type
    const call = body?.data?.object

    // Only handle completed calls that were missed (no answeredBy, duration 0 or very short)
    if (type !== 'call.completed') {
      return NextResponse.json({ ok: true, skipped: 'not a call.completed event' })
    }

    const direction = call?.direction
    const answeredBy = call?.answeredBy
    const duration = call?.duration ?? 0
    const participants = call?.participants ?? []

    // Missed = inbound, not answered, duration < 10s
    const isMissed = direction === 'incoming' && !answeredBy && duration < 10

    if (!isMissed) {
      return NextResponse.json({ ok: true, skipped: 'call was answered or outbound' })
    }

    // Get the caller's number from participants
    const callerNumber = participants.find((p: string) => p !== QUO_FROM_NUMBER)
    if (!callerNumber) {
      return NextResponse.json({ ok: true, skipped: 'no caller number found' })
    }

    const sent = await sendSMS(callerNumber)
    console.log(`Auto-SMS ${sent ? 'sent' : 'failed'} to ${callerNumber}`)

    return NextResponse.json({ ok: true, sent, to: callerNumber })
  } catch (err) {
    console.error('Quo webhook error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
