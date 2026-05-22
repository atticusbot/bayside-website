import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Skill Library — Bayside AI',
  description: 'Under construction.',
}

export default function SkillLibrary() {
  return (
    <main className="typed-page">
      <header className="typed-header">
        <a href="/" className="typed-logo" aria-label="Bayside AI home">
          <Image src="/bayside-type-logo.svg" alt="Bayside AI" width={364} height={91} priority />
        </a>
        <a href="https://cal.com/bayside-ai" className="typed-link" target="_blank" rel="noopener noreferrer">
          BOOK A CALL
        </a>
      </header>

      <section className="skill-library-stub">
        <p className="type-heading">SKILL LIBRARY</p>
        <p>Under construction.</p>
        <p><a href="/">Back to home.</a></p>
      </section>

      <footer className="site-footer">
        <div>BAYSIDE AI</div>
        <nav aria-label="Footer">
          <a href="mailto:tyler@baysideai.co">CONTACT</a>
          <a href="/">HOME</a>
        </nav>
      </footer>
    </main>
  )
}
