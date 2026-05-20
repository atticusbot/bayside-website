import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Bayside AI',
  description:
    'Bayside gives small firms more freedom to focus on the work they love most.',
}

const manifesto = [
  'AI will become as assumed as the computer, the car, or the phone. Bayside exists for the moment before that becomes obvious. The moment when a small firm knows something is changing but cannot afford to figure it out alone.',
  "A tool's value is shaped by the human who wields it, not the other way around. The firms that benefit most will not be the ones with the most tools. They will be the ones with the most clarity about their own work.",
  'So we embed. We observe. We hypothesize. We build. We iterate. The scientific method, applied to the daily work of a small firm.',
  'We do not ship slop. We do not over-engineer. We do not touch the judgment that professionals are paid to make. That is your work. Ours is everything around it.',
  'What you get back, on the other side, is time. More time on the design, the engineering, the closing, the guest, the client, the patient, the craft. The parts of the work that drew you to it in the first place.',
]

const outcomes = [
  'A website that says what you mean.',
  'Follow-up that happens without being remembered.',
  'Intake that reaches the right place.',
  'Past work that can be found and reused.',
  'A quieter week.',
]

const notes = [
  ['We start close to the work.', 'Calls, emails, forms, proposals, notes, reviews, half-finished documents, the things people keep in their heads.'],
  ['We remove what repeats.', 'Not the judgment. Not the taste. Not the relationship. The drag around it.'],
  ['We leave behind working parts.', 'Pages, prompts, records, routing, drafts, reminders, and small rituals that keep doing their job.'],
]

export default function Home() {
  return (
    <main className="typed-page">
      <header className="typed-header">
        <a href="/" className="typed-logo" aria-label="Bayside AI home">
          <Image src="/bayside-type-logo.svg" alt="Bayside AI" width={364} height={91} priority />
        </a>
        <a href="mailto:tyler@baysideai.co" className="typed-link">
          WRITE
        </a>
      </header>

      <section className="typed-hero">
        <p className="kicker">FOR CREATIVES, THINKERS, AND DOERS, WE OFFER:</p>
        <h1 className="type-heading hero-title">FREEDOM TO FOCUS ON WHAT YOU LOVE MOST ABOUT YOUR WORK.</h1>
        <p className="hero-copy">
          Bayside automates tasks that eat your day. What remains is more time for the judgment,
          taste, care, and craft that only you can provide.
        </p>
      </section>

      <section className="manifesto-shell" aria-label="Bayside manifesto">
        <div className="dialog-top">
          <span>MANIFESTO.TXT</span>
          <span>SCROLL</span>
        </div>
        <div className="manifesto-dialog" tabIndex={0}>
          {manifesto.map((paragraph, index) => (
            <p key={paragraph}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="typed-section">
        <h2 className="type-heading">WHAT GETS LIGHTER</h2>
        <ul className="typed-list">
          {outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <section className="typed-section note-grid">
        {notes.map(([title, body]) => (
          <article key={title}>
            <h2 className="type-heading">{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="typed-close">
        <p className="kicker">THE OFFER</p>
        <h2 className="type-heading">SEND US THE MESS.</h2>
        <p>
          The website draft. The intake form. The proposal you keep rewriting. The follow-up you forget.
          The notes no one can find. We will tell you what should become lighter first.
        </p>
        <a href="mailto:tyler@baysideai.co" className="typed-button">
          TYLER@BAYSIDEAI.CO
        </a>
      </section>
    </main>
  )
}
