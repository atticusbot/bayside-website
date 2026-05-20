import type { Metadata } from 'next'

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

function ReedMark({ className = 'mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 48" aria-hidden="true">
      <rect x="6" y="32" width="3" height="14" rx="1.5" fill="#5A7D54" />
      <rect x="14" y="22" width="3" height="24" rx="1.5" fill="#5A7D54" />
      <rect x="22" y="14" width="3" height="32" rx="1.5" fill="#3D5A3A" />
      <rect x="30" y="26" width="3" height="20" rx="1.5" fill="#5A7D54" />
      <rect x="38" y="6" width="3" height="40" rx="1.5" fill="#3D5A3A" />
      <rect x="46" y="18" width="3" height="28" rx="1.5" fill="#5A7D54" />
      <rect x="54" y="28" width="3" height="18" rx="1.5" fill="#5A7D54" />
      <rect x="62" y="30" width="3" height="16" rx="1.5" fill="#5A7D54" />
      <rect x="70" y="22" width="3" height="24" rx="1.5" fill="#5A7D54" />
    </svg>
  )
}

export default function Home() {
  return (
    <main className="typed-page">
      <header className="typed-header">
        <a href="/" className="typed-logo" aria-label="Bayside AI home">
          <ReedMark />
          <span>BAYSIDE AI</span>
        </a>
        <a href="mailto:tyler@baysideai.co" className="typed-link">
          WRITE
        </a>
      </header>

      <section className="typed-hero">
        <p className="kicker">FOR PEOPLE WHO WOULD RATHER BE DOING THE WORK</p>
        <h1 className="type-heading hero-title">FREEDOM TO FOCUS ON WHAT YOU LOVE MOST ABOUT YOUR WORK.</h1>
        <p className="hero-copy">
          Bayside takes the repeatable work around your work and makes it quieter.
          What remains is more time for the judgment, taste, care, and craft that only you can provide.
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
        <h2 className="type-heading">WHAT YOU GET BACK</h2>
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
