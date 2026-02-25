const problems = [
  { text: "No time to respond to reviews" },
  { text: "You show up on page 2, or not at all" },
  { text: "Guests forget you exist after checkout" },
];

const steps = [
  {
    step: "1",
    title: "We audit your online presence",
    desc: "Google, TripAdvisor, AI search, local SEO — we check everything guests see before they book.",
  },
  {
    step: "2",
    title: "We build the systems",
    desc: "Review responses, local SEO fixes, guest email flows — tailored to your property.",
  },
  {
    step: "3",
    title: "You get guests, we handle the rest",
    desc: "Monthly reports, ongoing optimization, and continuous improvements — hands off for you.",
  },
];

const services = [
  {
    title: "Reputation & Reviews",
    desc: "Monitor and respond to reviews across every platform — Google, TripAdvisor, Booking.com, and more.",
  },
  {
    title: "Local SEO & AI Search",
    desc: "Show up when guests search on Google, Maps, and AI tools like ChatGPT and Perplexity.",
  },
  {
    title: "Guest Communication",
    desc: "Pre-arrival, welcome, and post-stay emails that bring guests back season after season.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-t-[3px] border-gold bg-navy-dark/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-xl font-semibold text-warm tracking-tight">Bayside AI</span>
          <a href="#audit" className="bg-gold px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-navy transition hover:bg-gold-light">
            Get Your Free Audit
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24" style={{background: 'radial-gradient(ellipse 80% 60% at 20% 50%, #1a3a5c 0%, #0a1f36 70%)'}}>

          {/* Decorative SVG wave pattern - subtle, navy-on-navy */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="waves" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                  <path d="M0 60 Q30 30 60 60 Q90 90 120 60" stroke="#c9a96e" strokeWidth="1" fill="none"/>
                  <path d="M0 80 Q30 50 60 80 Q90 110 120 80" stroke="#c9a96e" strokeWidth="0.5" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waves)"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <div className="mb-8 inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gold/60"/>
              <p className="text-label font-sans uppercase tracking-[0.2em] text-gold/80">AI for Ocean City Hotels</p>
              <div className="h-px w-8 bg-gold/60"/>
            </div>

            {/* Headline */}
            <h1 className="font-display mb-8">
              <span className="block text-display-xl font-bold text-warm">Your guests are talking.</span>
              <span className="block text-display-xl font-bold italic text-gold">Are you listening?</span>
            </h1>

            {/* Subhead */}
            <p className="text-body-lg mx-auto mb-12 max-w-[540px] font-sans text-warm/65 leading-relaxed">
              We help independent hotels in Ocean City get found online, fix
              their reputation, and keep guests coming back&nbsp;&mdash; using AI
              systems that work while you sleep.
            </p>

            {/* CTA group */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="#audit" className="inline-block bg-gold px-10 py-4 text-label font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)]">
                Get Your Free Audit
              </a>
              <a href="#how-it-works" className="text-sm font-sans text-warm/50 underline underline-offset-4 transition hover:text-warm/80">
                See how it works →
              </a>
            </div>

            <p className="mt-6 text-xs font-sans text-warm/30 tracking-wide">No commitment. Delivered in 48 hours.</p>
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-dark/80 to-transparent"/>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="h-5 w-5 text-warm/25" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
            </svg>
          </div>
        </section>

        {/* ── PROBLEMS ── */}
        <section className="bg-navy px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-display-lg mb-16 text-center font-bold text-warm">Sound familiar?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {problems.map((item, i) => (
                <div key={item.text} className="group relative overflow-hidden border border-warm/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-all duration-300 hover:border-gold/30 hover:from-white/[0.07]">
                  {/* Ghost number */}
                  <span className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[9rem] font-bold leading-none text-white/[0.04] group-hover:text-white/[0.06] transition-colors">
                    {String(i+1).padStart(2,'0')}
                  </span>
                  {/* Gold accent line */}
                  <div className="mb-6 h-[2px] w-8 bg-gold/60"/>
                  <p className="font-display relative text-xl font-medium italic leading-snug text-warm/90">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="px-6 py-24 md:py-32 bg-warm">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-display-lg mb-20 text-center font-bold text-navy">How it works</h2>
            <div className="relative grid gap-16 md:grid-cols-3 md:gap-8">
              {/* Connecting line on desktop */}
              <div className="pointer-events-none absolute top-6 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block"/>

              {steps.map((item) => (
                <div key={item.step} className="relative">
                  {/* Step indicator */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center border border-gold/40 bg-navy text-sm font-bold font-display text-gold">
                      {item.step}
                    </div>
                    <div className="h-px flex-1 bg-navy/10 md:hidden"/>
                  </div>
                  {/* Ghost number behind */}
                  <span className="pointer-events-none absolute top-0 right-0 select-none font-display text-[7rem] font-bold leading-none text-navy/[0.04]">
                    {item.step}
                  </span>
                  <p className="mb-2 text-label font-sans uppercase tracking-[0.15em] text-gold/70">Step {item.step}</p>
                  <h3 className="font-display text-display-md mb-3 font-bold text-navy">{item.title}</h3>
                  <p className="font-sans text-navy/55 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-warm-dim px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-display-lg mb-16 text-center font-bold text-navy">What we do</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((item) => (
                <div key={item.title} className="group relative bg-warm p-8 shadow-[0_2px_20px_rgba(15,39,68,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,39,68,0.12)]">
                  {/* Gold accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold transition-all duration-300 group-hover:w-[4px] group-hover:bg-gold-light"/>
                  <h3 className="font-display text-display-md mb-3 font-bold text-navy">{item.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-navy/55">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32" style={{background: 'linear-gradient(135deg, #0a1f36 0%, #0f2744 60%, #1a3a5c 100%)'}}>
          {/* Large decorative quotation mark */}
          <div className="pointer-events-none absolute -top-12 left-8 select-none font-display text-[20rem] font-bold leading-none text-white/[0.03]" aria-hidden="true">
            &ldquo;
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-10 flex items-center gap-6">
              <div className="h-px flex-1 bg-gold/20"/>
              <div className="h-1.5 w-1.5 rounded-full bg-gold/60"/>
              <div className="h-px flex-1 bg-gold/20"/>
            </div>
            <h2 className="font-display text-display-lg mb-6 font-bold italic text-warm">
              Built for Ocean City. Powered by AI.
            </h2>
            <p className="font-sans text-body-lg text-warm/60 leading-relaxed">
              We are Tyler and Atticus&nbsp;&mdash; a founder with deep roots in
              Ocean City hospitality and an AI built to run the operation. Every
              audit, report, and email is generated by AI and reviewed for
              accuracy before it reaches your business.
            </p>
          </div>
        </section>

        {/* ── FREE AUDIT CTA ── */}
        <section id="audit" className="bg-warm-dim px-6 py-24 md:py-32">
          <div className="mx-auto max-w-xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-display-lg mb-4 font-bold text-navy">
                Find out what guests really think about your hotel.
              </h2>
              <p className="font-sans text-body-lg text-navy/55">
                We&rsquo;ll pull your reviews, check your search visibility, and tell you exactly what to fix&nbsp;&mdash; for free.
              </p>
            </div>
            <form action="mailto:tyler@baysideai.co" method="POST" encType="text/plain" className="grid gap-6">
              {[
                { name: 'name', placeholder: 'Your name', type: 'text' },
                { name: 'hotel', placeholder: 'Hotel name', type: 'text' },
                { name: 'email', placeholder: 'Email address', type: 'email' },
              ].map(field => (
                <div key={field.name} className="group relative">
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    placeholder={field.placeholder}
                    className="w-full border-0 border-b-2 border-navy/15 bg-transparent pb-3 pt-1 font-sans text-navy placeholder:text-navy/35 focus:border-gold focus:outline-none transition-colors duration-200 group-hover:border-navy/30"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-focus-within:w-full"/>
                </div>
              ))}
              <button type="submit" className="mt-4 bg-navy px-10 py-4 text-label font-semibold uppercase tracking-[0.15em] text-warm transition-all duration-200 hover:bg-navy-light hover:shadow-[0_8px_30px_rgba(15,39,68,0.3)]">
                Get My Free Audit
              </button>
              <p className="text-center text-xs font-sans text-navy/35 tracking-wide">No commitment · Delivered in 48 hours</p>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t-[3px] border-gold bg-navy-dark px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 md:flex-row md:justify-between">
          <span className="font-display text-sm font-semibold text-warm/60">Bayside AI</span>
          <p className="text-xs font-sans text-warm/35 tracking-wide">
            &copy; 2026 Bayside AI LLC &middot; Ocean City, MD
          </p>
          <a href="mailto:tyler@baysideai.co" className="text-xs font-sans text-warm/40 underline underline-offset-4 transition hover:text-warm/70">
            tyler@baysideai.co
          </a>
        </div>
      </footer>
    </>
  );
}
