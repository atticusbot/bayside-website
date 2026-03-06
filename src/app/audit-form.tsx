'use client'

import { useState } from 'react'

export default function AuditForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      business: (form.elements.namedItem('business') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      painPoints: (form.elements.namedItem('painPoints') as HTMLTextAreaElement)?.value || '',
    }
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-bio/30 bg-bio/5 p-8 text-center">
        <div className="font-mono text-bio text-2xl font-bold mb-3">✓</div>
        <p className="font-mono text-foam font-bold mb-2">Request received.</p>
        <p className="font-sans text-foam/70 text-sm">Your audit will be in your inbox within 48 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      {[
        { name: 'name', label: 'Your name', type: 'text' },
        { name: 'business', label: 'Business name', type: 'text' },
        { name: 'email', label: 'Email address', type: 'email' },
      ].map(field => (
        <div key={field.name} className="group relative">
          <label htmlFor={field.name} className="block font-mono text-label uppercase tracking-[0.15em] text-bio/60 mb-2">
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            required
            disabled={status === 'loading'}
            className="w-full bg-transparent border-0 border-b border-bio/20 pb-3 pt-1 font-sans text-foam placeholder:text-foam/20 focus:border-bio focus:outline-none transition-colors duration-200 group-hover:border-bio/40 disabled:opacity-50"
          />
        </div>
      ))}

      <div className="group relative">
        <label htmlFor="painPoints" className="block font-mono text-label uppercase tracking-[0.15em] text-bio/60 mb-2">
          If I could automate one part of my week it would be: <span className="text-foam/30 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="painPoints"
          name="painPoints"
          rows={3}
          disabled={status === 'loading'}
          className="w-full bg-transparent border border-bio/20 p-3 font-sans text-foam text-sm placeholder:text-foam/20 focus:border-bio focus:outline-none transition-colors duration-200 group-hover:border-bio/40 disabled:opacity-50 resize-none"
          placeholder="e.g. responding to Google reviews, posting on social media..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-4 bg-coral px-10 py-4 font-mono text-label font-bold uppercase tracking-[0.15em] text-ocean-dark transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(255,122,84,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Get My Free Audit →'}
      </button>
      {status === 'error' && (
        <p className="font-mono text-xs text-coral text-center">Something went wrong — email tyler@baysideai.co directly.</p>
      )}
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foam/40 text-center">
        No commitment · No sales call · Just data
      </p>
    </form>
  )
}
