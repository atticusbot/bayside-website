import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, hotel, email } = await req.json()

  if (!name || !hotel || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Try HubSpot — non-fatal if it fails
  const apiKey = process.env.HUBSPOT_API_KEY
  if (apiKey) {
    try {
      const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
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
      if (!contactRes.ok && contactRes.status !== 409) {
        console.error('HubSpot error:', contactRes.status, await contactRes.text().catch(() => ''))
      }
    } catch (e) {
      console.error('HubSpot exception:', e)
    }
  } else {
    console.warn('HUBSPOT_API_KEY not set')
  }

  // Notify #pipeline via Discord webhook — also non-fatal
  const webhookUrl = process.env.DISCORD_PIPELINE_WEBHOOK
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🎯 **New Audit Request**\n**Name:** ${name}\n**Hotel:** ${hotel}\n**Email:** ${email}`,
      }),
    }).catch((e) => console.error('Discord webhook error:', e))
  } else {
    console.warn('DISCORD_PIPELINE_WEBHOOK not set')
  }

  // Always return success — we captured the data
  return NextResponse.json({ success: true })
}
