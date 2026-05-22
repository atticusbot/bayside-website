import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import CodeForm from './CodeForm'

export const metadata: Metadata = {
  title: 'Skills Library — Bayside AI',
  description:
    'Four free skills for structural, civil, MEP, geotechnical, and architecture practices. Proposals, site visit reports, permit checklists, and CA log entries.',
}

const skills = [
  {
    title: 'Proposal Drafter From Past Wins',
    body: 'Drafts a new client proposal by pulling structure and language from past proposals that already won. Asks the discipline at runtime, runs a short intake, selects the right template, and returns a structured draft for the engineer or principal to edit.',
  },
  {
    title: 'Site Visit Notes To Project Record',
    body: 'Turns raw site visit notes (typed, dictated, or photographed) into a clean visit report and a structured project record entry. Built for structural, civil, MEP, geotechnical, and architecture practices.',
  },
  {
    title: 'Permit Submission Package Checklist',
    body: 'Returns a ready submission checklist for a Philadelphia Department of Licenses and Inspections building permit package. Covers new construction, alterations, additions, and demolition. Includes a paste-your-own template for other jurisdictions.',
  },
  {
    title: 'Construction Administration Log Entry',
    body: 'Turns a field event, RFI, submittal review, field observation, or directive into a structured construction administration log entry. Five entry types: RFI response, submittal review, field observation, field directive, and meeting note.',
  },
]

export default function SkillsLibrary() {
  return (
    <main className="typed-page">
      <header className="typed-header">
        <a href="/" className="typed-logo" aria-label="Bayside AI home">
          <Image
            src="/bayside-type-logo.svg"
            alt="Bayside AI"
            width={364}
            height={91}
            priority
          />
        </a>
        <button
          type="button"
          className="typed-link"
          data-cal-link="bayside-ai"
          data-cal-config='{"layout":"month_view"}'
        >
          BOOK A CALL
        </button>
      </header>

      {/* Hero */}
      <section className="typed-hero skills-hero">
        <p className="kicker">
          STRUCTURAL, CIVIL, MEP, GEOTECHNICAL, AND ARCHITECTURE PRACTICES
        </p>
        <h1 className="type-heading hero-title">
          A FREE SKILL LIBRARY FOR AEC FIRMS.
        </h1>
        <p className="hero-copy">
          Four skills, each built around a repeating piece of work that tends
          to get dropped: proposals built from past wins, site visit reports,
          Philadelphia permit submission checklists, and construction
          administration log entries. They run in Claude or ChatGPT. No
          additional account required.
        </p>
        <p className="skills-gate-label">
          Enter the access code from your invite to download the library.
        </p>
        <Suspense>
          <CodeForm />
        </Suspense>
      </section>

      {/* Skill cards */}
      <section className="typed-section">
        <h2 className="type-heading">THE FOUR SKILLS.</h2>
        <div className="skills-grid">
          {skills.map(skill => (
            <article key={skill.title} className="skills-card">
              <h3 className="type-heading skills-card-heading">{skill.title}</h3>
              <p>{skill.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Guardrail */}
      <section className="typed-section">
        <h2 className="type-heading">WHAT THESE SKILLS WILL NOT DO.</h2>
        <div className="skills-guardrail">
          <p>
            These skills do not make engineering decisions. They do not size
            members, specify materials, set loads, interpret code, recommend
            means and methods, or resolve technical conflicts. They do not
            stand in for a stamped opinion.
          </p>
          <p>
            What they do: organize the work around the engineering. Draft.
            Structure. Format. Cross-reference. Surface what is missing. Hand
            a clean record back to the person responsible.
          </p>
          <p>
            If a skill is asked for an engineering call, it should refuse and
            return the question to the engineer. The skills are written to do
            this on their own. If you find a case where one does not, send it
            to{' '}
            <a href="mailto:tyler@baysideai.co">tyler@baysideai.co</a>.
          </p>
          <p className="skills-guardrail-note">
            This rule is non-negotiable. It is the reason the library exists
            in a form a firm can actually use.
          </p>
        </div>
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
