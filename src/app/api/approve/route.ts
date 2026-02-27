import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, property, message } = await req.json()
  if (!name || !email || !property) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.HUBSPOT_API_KEY
  let contactId: string | null = null
  let dealId: string | null = null

  if (apiKey) {
    // Create or find contact
    try {
      const cr = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: {
          firstname: name.split(' ')[0] || name,
          lastname: name.split(' ').slice(1).join(' ') || '',
          email, company: property, hs_lead_status: 'IN_PROGRESS'
        }})
      })
      if (cr.ok) {
        contactId = (await cr.json()).id
      } else if (cr.status === 409) {
        const s = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }] })
        })
        if (s.ok) contactId = (await s.json()).results?.[0]?.id ?? null
      }
    } catch(e) { console.error(e) }

    // Create deal
    try {
      const closeDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const dr = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: {
          dealname: `${property} — Proposal Approved`,
          dealstage: 'appointmentscheduled',
          pipeline: 'default',
          closedate: closeDate,
          amount: '1500',
          description: message || `${name} approved the Bayside AI proposal for ${property}.`
        }})
      })
      if (dr.ok) {
        const deal = await dr.json()
        dealId = deal.id
        if (contactId) {
          await fetch('https://api.hubapi.com/crm/v3/associations/deals/contacts/batch/create', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputs: [{ from: { id: dealId }, to: { id: contactId }, type: 'deal_to_contact' }] })
          }).catch(() => {})
        }
      }
    } catch(e) { console.error(e) }
  }

  // Discord notification with HubSpot deal link
  const webhook = process.env.DISCORD_PIPELINE_WEBHOOK
  if (webhook) {
    const hubspotLink = dealId ? `\n\n📋 <https://app.hubspot.com/contacts/deals/${dealId}>` : ''
    const noteLine = message ? `\n**Note:** ${message}` : ''
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `✅ **DEAL APPROVED**\n**Name:** ${name}\n**Property:** ${property}\n**Email:** ${email}${noteLine}${hubspotLink}`
      })
    }).catch(() => {})
  }

  return NextResponse.json({ success: true })
}
