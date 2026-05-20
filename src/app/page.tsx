import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bayside AI | Embedded Operating Systems for Small Professional Firms',
  description:
    'Bayside builds the website, workflows, reporting, and firm memory as one connected operating layer for small professional service firms.',
}

const systemLayers = [
  {
    number: '01',
    label: 'Market surface',
    title: 'A website that reflects how the firm actually wins work.',
    text: 'Service pages, proof, intake, and follow-up connect to the same source of truth instead of living as a static brochure.',
  },
  {
    number: '02',
    label: 'Workflow layer',
    title: 'The repeatable work stops depending on memory.',
    text: 'Intake routing, proposal support, status updates, and client follow-up move through a system your team can see and improve.',
  },
  {
    number: '03',
    label: 'Firm memory',
    title: 'Past work becomes reusable infrastructure.',
    text: 'Project language, decisions, objections, service patterns, and client history become available when the next proposal or page needs them.',
  },
  {
    number: '04',
    label: 'Reporting loop',
    title: 'The firm gets a clear read on what happened and what matters next.',
    text: 'Bayside turns activity into operating intelligence: what came in, what moved, what stalled, and where the next build should focus.',
  },
]

const verticals = [
  {
    title: 'Architecture and engineering',
    text: 'Proposal language, project proof, service pages, and intake flows that support the business around licensed judgment.',
  },
  {
    title: 'Professional trades and clinics',
    text: 'Lead capture, appointment follow-up, review requests, and simple reporting for firms where missed calls become missed revenue.',
  },
  {
    title: 'Boutique agencies',
    text: 'Reusable pitch language, client onboarding, delivery memory, and workflow structure for small teams with a lot in motion.',
  },
  {
    title: 'Hospitality operators',
    text: "Guest communication, local visibility, reputation response, and operational follow-through from Bayside's origin market.",
  },
]

const auditSteps = [
  'Map the client journey from first search to signed work.',
  'Document the workflows that currently live in inboxes, calls, notes, and memory.',
  'Identify the repeatable work with the highest return.',
  'Price the first build before any implementation commitment.',
]

function ReedMark({ className = 'h-10 w-24' }: { className?: string }) {
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
    <>
      <nav className="sticky top-0 z-50 border-b border-mist bg-page/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="flex items-center gap-3" aria-label="Bayside AI home">
            <ReedMark className="h-8 w-20" />
            <span className="font-serif text-[1.35rem] font-medium tracking-[-0.02em] text-ink">
              Bayside <span className="text-moss">AI</span>
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#system" className="nav-link">
              System
            </a>
            <a href="#audit" className="nav-link">
              Audit
            </a>
            <a href="#firms" className="nav-link">
              Firms
            </a>
            <a href="mailto:tyler@baysideai.co" className="btn-secondary">
              Start the audit
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-grid border-b border-mist">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-12 lg:py-24">
            <div>
              <p className="section-label">Bayside AI &middot; Professional service firms</p>
              <h1 className="mt-6 max-w-4xl font-serif text-[2.65rem] font-medium leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl md:text-7xl">
                An embedded operating system for your firm.
              </h1>
              <p className="mt-8 max-w-2xl font-serif text-lg italic leading-[1.55] text-ink/75 md:text-2xl">
                Bayside builds the website, workflows, and firm memory as one connected system, so principals spend more time on the work only they can do.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:tyler@baysideai.co" className="btn-primary">
                  Start with the audit
                </a>
                <a href="#system" className="btn-secondary">
                  See how it works
                </a>
              </div>
            </div>

            <aside className="system-card self-end" aria-label="Bayside operating system map">
              <div className="flex items-center justify-between border-b border-mist pb-5">
                <p className="section-label mb-0">Operating map</p>
                <ReedMark className="h-7 w-16" />
              </div>
              <div className="mt-7 space-y-5">
                {['Market surface', 'Workflow layer', 'Firm memory', 'Reporting loop'].map((item, index) => (
                  <div key={item} className="map-row">
                    <span className="map-number">0{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-7 border-t border-mist pt-5 text-sm leading-6 text-ink/70">
                The site is not separate from operations. It is the front edge of the same system.
              </p>
            </aside>
          </div>
        </section>

        <section className="section bg-cream">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="section-label">01 &middot; The problem</p>
              <h2 className="section-title">Small firms do not have one problem. They have disconnected surfaces.</h2>
            </div>
            <div className="mt-12 grid gap-px border border-mist bg-mist md:grid-cols-3">
              {[
                ['The website', 'It says what the firm does, but it does not learn from the work that wins.'],
                ['The workflow', "Important steps live in inboxes, calls, spreadsheets, and someone's head."],
                ['The follow-up', 'Leads, proposals, and clients move forward only when a person remembers to move them.'],
              ].map(([title, text]) => (
                <div key={title} className="bg-page p-8 md:p-10">
                  <div className="mb-7 h-px w-12 bg-moss" />
                  <h3 className="font-serif text-2xl font-medium tracking-[-0.012em] text-ink">{title}</h3>
                  <p className="mt-4 text-[15px] leading-7 text-ink/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="system" className="section border-y border-mist bg-page">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)]">
              <div>
                <p className="section-label">02 &middot; The Bayside system</p>
                <h2 className="section-title">The operating layer around the work.</h2>
                <p className="mt-6 text-[15px] leading-7 text-ink/75">
                  Bayside does not touch licensed professional judgment. It builds the structure around it: the market surface, workflow layer, firm memory, and reporting loop.
                </p>
              </div>
              <div className="space-y-4">
                {systemLayers.map((layer) => (
                  <article key={layer.number} className="layer-card">
                    <div>
                      <p className="font-serif text-2xl font-medium text-moss">{layer.number}</p>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate">{layer.label}</p>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-medium leading-tight tracking-[-0.012em] text-ink">{layer.title}</h3>
                      <p className="mt-3 text-[15px] leading-7 text-ink/75">{layer.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="audit" className="section bg-linen">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-12">
            <div>
              <p className="section-label">03 &middot; How engagements start</p>
              <h2 className="section-title">Start with the paid audit. Build only after the work is clear.</h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-ink/75">
                Two to three weeks. Bayside maps the firm, finds the work that repeats, and prices the first build before implementation begins. The audit keeps the engagement practical and protects the firm from buying theater.
              </p>
            </div>
            <div className="border border-mist bg-paper p-8">
              <p className="section-label">Audit outputs</p>
              <ol className="mt-6 space-y-4">
                {auditSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-[15px] leading-7 text-ink/75">
                    <span className="font-serif text-lg font-medium text-moss">0{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="firms" className="section border-y border-mist bg-page">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="section-label">04 &middot; Who it is for</p>
              <h2 className="section-title">Built for small professional service firms. Adapted by vertical.</h2>
            </div>
            <div className="mt-12 grid gap-px border border-mist bg-mist md:grid-cols-2 lg:grid-cols-4">
              {verticals.map((vertical) => (
                <article key={vertical.title} className="group bg-paper p-7 transition-colors duration-200 hover:bg-cream">
                  <div className="mb-7 h-px w-10 bg-moss transition-all duration-200 group-hover:w-16" />
                  <h3 className="font-serif text-xl font-medium leading-tight tracking-[-0.012em] text-ink">{vertical.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink/70">{vertical.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-cream">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:px-12">
            <div>
              <p className="section-label">05 &middot; Competitive frame</p>
              <h2 className="section-title">The connected thing is the category.</h2>
            </div>
            <div className="space-y-4">
              {[
                'A web agency builds a site that does not compound.',
                'An automation consultant builds workflows that never touch the market surface.',
                'A strategy firm delivers recommendations without the system.',
                'Bayside builds the website and the automations as the same operating layer.',
              ].map((line) => (
                <p key={line} className="border-l-4 border-moss bg-paper px-6 py-5 font-serif text-xl italic leading-8 text-ink/85">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-page">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
            <p className="section-label justify-center">06 &middot; The belief</p>
            <h2 className="section-title mx-auto">The firms that benefit most are the ones with clarity about their own work.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-ink/75">
              {"A tool's value is shaped by the human who wields it, not the other way around. Bayside exists to make the surrounding system clear enough that better tools can actually matter."}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="mailto:tyler@baysideai.co" className="btn-primary">
                Start with the audit
              </a>
              <Link href="/blog" className="btn-secondary">
                Read the field notes
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-mist bg-cream px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <ReedMark className="h-7 w-16" />
            <span className="font-serif text-lg font-medium text-ink">
              Bayside <span className="text-moss">AI</span>
            </span>
          </div>
          <p>Bayside AI LLC &middot; Ocean City, Maryland &middot; 2026</p>
          <a href="mailto:tyler@baysideai.co" className="text-moss-deep underline underline-offset-4">
            tyler@baysideai.co
          </a>
        </div>
      </footer>
    </>
  )
}
