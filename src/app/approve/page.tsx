'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const mono = 'Space Mono, monospace'
const body = 'Plus Jakarta Sans, sans-serif'

function ApproveForm() {
  const params = useSearchParams()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [property, setProperty] = useState(params.get('property') || '')
  const [message, setMessage]   = useState('')
  const [status, setStatus]     = useState<'idle'|'sending'|'done'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, property, message })
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  const label = { fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#6b8a82', display: 'block', marginBottom: '8px' }
  const input = { width: '100%', padding: '12px 14px', border: '1px solid #e8efed', fontSize: '15px', fontFamily: body, outline: 'none', boxSizing: 'border-box' as const }
  const wrap  = { minHeight: '100vh', background: '#07111f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }
  const card  = { background: '#fff', maxWidth: '520px', width: '100%', padding: '48px 40px' }
  const tag   = { fontFamily: mono, fontSize: '11px', letterSpacing: '0.2em', color: '#3d9eff', background: '#07111f', display: 'inline-block', padding: '4px 12px', marginBottom: '20px' }

  if (status === 'done') return (
    <div style={wrap}>
      <div style={{ ...card, textAlign: 'center' }}>
        <div style={tag}>[ CONFIRMED ]</div>
        <h1 style={{ fontFamily: mono, fontSize: '22px', color: '#07111f', marginBottom: '16px', lineHeight: 1.3 }}>
          {"You're in. We'll take it from here."}
        </h1>
        <p style={{ fontSize: '15px', color: '#3d5a54', lineHeight: 1.7 }}>
          Tyler will be in touch within 24 hours to send over the service agreement and get your kickoff scheduled.
        </p>
        <p style={{ fontSize: '13px', color: '#6b8a82', marginTop: '24px' }}>
          Questions? Email <a href="mailto:tyler@baysideai.co" style={{ color: '#07111f' }}>tyler@baysideai.co</a>
        </p>
      </div>
    </div>
  )

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ marginBottom: '32px' }}>
          <div style={tag}>[ BAYSIDE AI ]</div>
          <h1 style={{ fontFamily: mono, fontSize: '22px', color: '#07111f', lineHeight: 1.3, marginBottom: '12px' }}>
            {"Let's get started."}
          </h1>
          <p style={{ fontSize: '15px', color: '#3d5a54', lineHeight: 1.7 }}>
            {"Confirm your details below and we'll send over the service agreement within 24 hours."}
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={label}>Your Name</label>
            <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={input} />
          </div>
          <div>
            <label style={label}>Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourbusiness.com" style={input} />
          </div>
          <div>
            <label style={label}>Property</label>
            <input required value={property} onChange={e => setProperty(e.target.value)} placeholder="Hotel or business name" style={input} />
          </div>
          <div>
            <label style={{ ...label, marginBottom: '8px' }}>
              Anything else? <span style={{ color: '#c8a96e' }}>(optional)</span>
            </label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3}
              placeholder="Questions, timing, anything you want us to know..."
              style={{ ...input, resize: 'vertical' }} />
          </div>
          <button type="submit" disabled={status === 'sending'}
            style={{ background: '#3d9eff', color: '#07111f', fontFamily: mono, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 24px', border: 'none', cursor: 'pointer', opacity: status === 'sending' ? 0.6 : 1 }}>
            {status === 'sending' ? 'Submitting...' : 'Confirm & Move Forward \u2192'}
          </button>
          {status === 'error' && (
            <p style={{ color: '#c0392b', fontSize: '13px', margin: 0 }}>
              Something went wrong — email <a href="mailto:tyler@baysideai.co">tyler@baysideai.co</a> directly.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default function ApprovePage() {
  return <Suspense><ApproveForm /></Suspense>
}
