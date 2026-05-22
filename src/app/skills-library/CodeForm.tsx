'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CodeForm() {
  const searchParams = useSearchParams()
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle')
  const [firmName, setFirmName] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')

  async function validate(raw: string) {
    const trimmed = raw.trim()
    if (!trimmed) return
    setStatus('validating')
    try {
      const res = await fetch('/api/skills-library/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed }),
      })
      if (res.ok) {
        const data = await res.json()
        setFirmName(data.firmName)
        setDownloadUrl(data.downloadUrl)
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    const key = searchParams.get('key')
    if (key) {
      setCode(key)
      validate(key)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'validating' || status === 'success') return
    validate(code)
  }

  if (status === 'success') {
    return (
      <div className="skills-form-success">
        <p>Welcome, {firmName}.</p>
        <a href={downloadUrl} className="typed-button skills-download-btn">
          DOWNLOAD LIBRARY
        </a>
      </div>
    )
  }

  return (
    <>
      <form className="skills-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          required
          className="skills-input"
          placeholder="Access code"
          value={code}
          onChange={e => setCode(e.target.value)}
          disabled={status === 'validating'}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        <button
          type="submit"
          className="typed-button skills-submit"
          disabled={status === 'validating'}
          style={{ marginTop: 0, opacity: status === 'validating' ? 0.6 : 1 }}
        >
          {status === 'validating' ? 'CHECKING...' : 'GET DOWNLOAD LINK'}
        </button>
        {status === 'error' && (
          <p className="skills-form-error">
            Code not recognized. Check the link from your invite or contact{' '}
            <a href="mailto:tyler@baysideai.co">tyler@baysideai.co</a>.
          </p>
        )}
      </form>
      <p className="skills-access-note">
        No code? Email <a href="mailto:tyler@baysideai.co">tyler@baysideai.co</a>.
      </p>
    </>
  )
}
