import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, hotel, email } = await req.json()

  if (!name || !hotel || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.HUBSPOT_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  // Create Contact in HubSpot
  const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        firstname: name.split(' ')[0] || name,
        lastname: name.split(' ').slice(1).join(' ') || '',
        email,
        company: hotel,
        hs_lead_status: 'NEW',
        message: `Audit request from baysideai.co | Hotel: ${hotel}`,
      }
    })
  })

  if (!contactRes.ok) {
    const err = await contactRes.json().catch(() => ({}))
    // 409 = contact already exists — not a real error
    if (contactRes.status !== 409) {
      console.error('HubSpot error:', err)
      return NextResponse.json({ error: 'Failed to save request' }, { status: 500 })
    }
  }

  // Notify #pipeline via Discord webhook
  const webhookUrl = process.env.DISCORD_PIPELINE_WEBHOOK
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🎯 **New Audit Request**\n**Name:** ${name}\n**Hotel:** ${hotel}\n**Email:** ${email}`,
      }),
    }).catch(() => {}) // non-blocking — don't fail the request if Discord is down
  }

  return NextResponse.json({ success: true })
}
