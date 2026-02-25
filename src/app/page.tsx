import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bayside AI — AI for Ocean City Hotels',
  description: 'We help independent hotels in Ocean City get found online, fix their reputation, and keep guests coming back.',
}

const problems = [
  { num: '01', text: 'Negative reviews going unanswered for months' },
  { num: '02', text: 'Invisible in Google and AI-powered search' },
  { num: '03', text: 'No time to manage your digital presence' },
]

const steps = [
  { num: '01', label: 'Audit', title: 'We scan everything', desc: 'Reviews, search rankings, competitor positions, guest sentiment. A full picture in 48 hours.' },
  { num: '02', label: 'Fix', title: 'We fix what\'s broken', desc: 'Owner responses, listing cleanup, search optimization, AI visibility. Done-for-you.' },
  { num: '03', label: 'Grow', title: 'We keep it growing', desc: 'Monthly reporting, ongoing reputation management, and AI systems that work while you sleep.' },
]

const services = [
  { title: 'Reputation Management', desc: 'Review monitoring, owner responses, and guest sentiment analysis across Google, TripAdvisor, and Booking.com.' },
  { title: 'Local & AI Search', desc: 'Google Business Profile optimization, local SEO, and GEO — so your hotel shows up when guests ask AI assistants.' },
  { title: 'Guest Communication', desc: 'Pre-arrival, welcome, and follow-up email automation that drives reviews and repeat bookings.' },
]

export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-bio/10 bg-ocean-dark/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-bold text-foam tracking-tight">Bayside AI</span>
            <span className="hidden sm:inline text-label font-mono text-bio/60 uppercase tracking-[0.15em]">[ Ocean City ]</span>
          </div>
          <a href="#audit" className="border border-bio/40 px-5 py-2 text-label font-mono font-bold uppercase tracking-[0.12em] text-bio transition-all duration-200 hover:bg-bio/10 hover:border-bio">
            Free Audit
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
        {/* Organic wave graphic */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.06]" aria-hidden="true">
          <svg viewBox="0 0 400 800" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 0 Q200 100 350 200 Q500 300 200 400 Q-100 500 300 600 Q500 700 200 800" stroke="#3dffa0" strokeWidth="2" fill="none"/>
            <path d="M400 50 Q150 150 300 250 Q450 350 150 450 Q-50 550 250 650 Q450 750 150 850" stroke="#3dffa0" strokeWidth="1" fill="none"/>
            <path d="M350 0 Q100 120 280 220 Q460 320 180 440 Q-80 520 280 640" stroke="#c8a96e" strokeWidth="0.5" fill="none" opacity="0.5"/>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Section label */}
          <div className="mb-10 inline-flex items-center gap-3">
            <div className="h-px w-6 bg-bio/40"/>
            <span className="font-mono text-label uppercase tracking-[0.2em] text-bio/70">[ AI for Independent Hotels ]</span>
            <div className="h-px w-6 bg-bio/40"/>
          </div>

          {/* Headline with word-level highlight */}
          <h1 className="font-mono text-display-xl font-bold text-foam mb-4 leading-[1.05]">
            Your guests are talking.
          </h1>
          <h1 className="font-mono text-display-xl font-bold mb-10 leading-[1.05]">
            <span className="bg-bio/15 border border-bio/30 px-3 py-1 text-bio">Are you listening?</span>
          </h1>

          <p className="font-sans text-lg mx-auto mb-12 max-w-[520px] text-foam/60 leading-relaxed">
            We help independent hotels in Ocean City get found online, fix
            their reputation, and keep guests coming back — using AI
            systems that work while you sleep.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#audit" className="bg-bio px-10 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:bg-bio-dim hover:shadow-[0_8px_30px_rgba(61,255,160,0.25)]">
              Get Your Free Audit
            </a>
            <a href="#how-it-works" className="font-mono text-sm text-foam/40 transition hover:text-foam/70">
              see how it works →
            </a>
          </div>

          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foam/25">
            No commitment · Delivered in 48 hours
          </p>
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-5 w-5 text-foam/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
          </svg>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="relative px-6 py-24 md:py-32 bg-ocean-mid">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 01 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-16">Sound familiar?</h2>
          <div className="grid gap-px bg-bio/10 md:grid-cols-3">
            {problems.map((p) => (
              <div key={p.num} className="group relative bg-ocean-mid p-8 transition-colors duration-300 hover:bg-ocean-light">
                <div className="mb-6 font-mono text-[4rem] font-bold leading-none text-bio/10 group-hover:text-bio/20 transition-colors">
                  {p.num}
                </div>
                <p className="font-sans text-base leading-relaxed text-foam/70 group-hover:text-foam/90 transition-colors">
                  &ldquo;{p.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="px-6 py-24 md:py-32 bg-ocean-dark">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 02 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-20">How it works</h2>
          <div className="grid gap-12 md:grid-cols-3 md:gap-6">
            {steps.map((step) => (
              <div key={step.num} className="group">
                <div className="mb-6 inline-flex items-center gap-3">
                  <div className="border border-bio/40 px-3 py-1.5 font-mono text-sm font-bold text-bio group-hover:bg-bio/10 transition-colors">
                    {step.num}
                  </div>
                  <span className="font-mono text-label uppercase tracking-[0.15em] text-bio/60">{step.label}</span>
                </div>
                <h3 className="font-mono text-display-md font-bold text-foam mb-3">{step.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-foam/55">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="px-6 py-24 md:py-32 bg-ocean-mid">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 03 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-16">What we do</h2>
          <div className="grid gap-px bg-bio/10 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group bg-ocean-mid p-8 transition-all duration-300 hover:bg-ocean-light">
                <div className="mb-4 h-px w-8 bg-bio/40 transition-all duration-300 group-hover:w-16 group-hover:bg-bio"/>
                <h3 className="font-mono text-display-md font-bold text-foam mb-3">{s.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-foam/55 group-hover:text-foam/75 transition-colors">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-6 py-24 md:py-32 bg-ocean-dark">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 04 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-8">
            Built for Ocean City.<br/>
            <span className="text-bio">Powered by AI.</span>
          </h2>
          <div className="h-px bg-bio/20 mb-8"/>
          <p className="font-sans text-lg text-foam/60 leading-relaxed mb-6">
            We are Tyler and Atticus — a founder with deep roots in Ocean City
            hospitality and an AI built to run the operation. Every audit, report,
            and email is generated by AI and reviewed for accuracy before it reaches
            your business.
          </p>
          <p className="font-sans text-base text-foam/40 leading-relaxed">
            Ocean City&rsquo;s independent hotels built this town. We&rsquo;re here to make sure
            AI works for them — not around them.
          </p>
        </div>
      </section>

      {/* ── AUDIT FORM ── */}
      <section id="audit" className="px-6 py-24 md:py-32 bg-ocean-mid">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 05 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-4">
            Find out what guests really think.
          </h2>
          <p className="font-sans text-base text-foam/55 mb-12 leading-relaxed">
            We&rsquo;ll pull your reviews, check your search visibility, and tell you
            exactly what to fix — for free. Delivered in 48 hours.
          </p>
          <form action="mailto:tyler@baysideai.co" method="POST" encType="text/plain" className="grid gap-8">
            {[
              { name: 'name', label: 'Your name', type: 'text' },
              { name: 'hotel', label: 'Hotel name', type: 'text' },
              { name: 'email', label: 'Email address', type: 'email' },
            ].map(field => (
              <div key={field.name} className="group relative">
                <label className="block font-mono text-label uppercase tracking-[0.15em] text-bio/60 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  className="w-full bg-transparent border-0 border-b border-bio/20 pb-3 pt-1 font-sans text-foam placeholder:text-foam/20 focus:border-bio focus:outline-none transition-colors duration-200 group-hover:border-bio/40"
                />
              </div>
            ))}
            <button type="submit" className="mt-4 bg-bio px-10 py-4 font-mono text-label font-bold uppercase tracking-[0.15em] text-ocean-dark transition-all duration-200 hover:bg-bio-dim hover:shadow-[0_8px_30px_rgba(61,255,160,0.2)]">
              Get My Free Audit →
            </button>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foam/25 text-center">
              No commitment · No sales call · Just data
            </p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-bio/10 bg-ocean-dark px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-sm font-bold text-foam/50">Bayside AI</span>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-foam/25">
            &copy; 2026 Bayside AI LLC · Ocean City, MD
          </p>
          <a href="mailto:tyler@baysideai.co" className="font-mono text-xs text-foam/35 underline underline-offset-4 transition hover:text-bio/70">
            tyler@baysideai.co
          </a>
        </div>
      </footer>

      {/* Scroll reveal script */}
      <script dangerouslySetInnerHTML={{__html: `
        const obs = new IntersectionObserver(els => els.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), {threshold:0.1});
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
      `}}/>
    </>
  )
}
