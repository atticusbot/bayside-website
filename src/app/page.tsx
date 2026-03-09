import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bayside AI — AI Automation for Small Business',
  description: 'We identify the repetitive tasks eating your week and automate them. Missed calls, review responses, follow-ups, scheduling. First automation is on us.',
}

const problems = [
  { num: '01', text: 'Calling back missed leads hours later — or not at all' },
  { num: '02', text: 'Writing the same review responses over and over' },
  { num: '03', text: 'Following up on bookings and invoices manually' },
]

const steps = [
  { num: '01', label: 'Audit', title: 'We find the leak', desc: 'A 30-minute call to identify the task costing you the most time and money. No prep needed.' },
  { num: '02', label: 'Build', title: 'We set it up', desc: 'We build and configure the automation for your business. Usually live within a week.' },
  { num: '03', label: 'Free', title: 'First month on us', desc: 'You pay nothing for month one. If it works, you stay. If not, no hard feelings.' },
]

const tiers = [
  {
    label: 'Simple',
    price: '$99–149',
    setup: '$250 setup',
    items: ['Missed call text-back', 'Review monitoring & alerts', 'Appointment reminders', 'Post-visit review requests'],
    color: 'border-bio/30',
    tag: 'Most popular starting point',
  },
  {
    label: 'Smart',
    price: '$249–349',
    setup: '$750 setup',
    items: ['Email triage + draft responses', 'Lead qualification', 'Booking follow-up sequences', 'Competitor rate monitoring'],
    color: 'border-coral/40',
    tag: 'Best ROI for service businesses',
  },
  {
    label: 'Complex',
    price: '$449–599',
    setup: '$1,500 setup',
    items: ['AI concierge (SMS/iMessage)', 'Dynamic pricing engine', 'Full reputation management', 'Content & social engine'],
    color: 'border-bio/30',
    tag: 'For businesses ready to scale',
  },
  {
    label: 'AI Assistant',
    price: '$999–1,499',
    setup: '$3,000 setup',
    items: ['Dedicated AI for your business', 'Unlimited automations', 'Connected to all your tools', 'Learns your business over time'],
    color: 'border-coral/40',
    tag: '3–4 automations = same cost',
  },
]

const sectors = [
  { title: 'Hotels', desc: 'Automate guest comms, review responses, and booking follow-ups.' },
  { title: 'Restaurants', desc: 'Never miss a reservation call. Follow up with every diner automatically.' },
  { title: 'Retail & Service', desc: 'Capture every lead, send every invoice reminder, fill every slow day.' },
  { title: 'Experiences', desc: 'Fill slow days with automated promos. Turn one visit into five-star reviews.' },
]

function getRecentPosts(count = 3) {
  const contentDir = path.join(process.cwd(), 'src/content/blog')
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const { data } = matter(fs.readFileSync(path.join(contentDir, file), 'utf8'))
      return { slug, title: data.title as string, excerpt: data.excerpt as string, date: data.date as string }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-bio/10 bg-ocean-dark/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/bayside-logo.svg" alt="Bayside AI" className="h-8" />
            <span className="font-mono font-bold text-foam tracking-tight">Bayside AI</span>
            <span className="hidden sm:inline text-label font-mono text-bio/70 uppercase tracking-[0.15em]">[ Ocean City ]</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#pricing" className="hidden sm:block font-mono text-label font-bold uppercase tracking-[0.12em] text-foam/70 transition-all duration-200 hover:text-bio">
              Pricing
            </a>
            <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="bg-coral px-5 py-2 text-label font-mono font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110">
              Claim Free Month
            </button>
          </div>
        </div>
      </nav>

      <main>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-10 inline-flex items-center gap-3">
            <div className="h-px w-6 bg-bio/40"/>
            <span className="font-mono text-label uppercase tracking-[0.2em] text-bio/70">[ AI Automation for the Eastern Shore ]</span>
            <div className="h-px w-6 bg-bio/40"/>
          </div>

          <h1 className="font-mono text-display-xl font-bold mb-10">
            <span className="block text-foam mb-6 leading-[1.1]">Stop doing it manually.</span>
            <span className="block bg-bio/15 border border-bio/30 px-4 py-3 text-bio leading-[1.1]">Your first automation is free.</span>
          </h1>

          <p className="font-sans text-lg mx-auto mb-4 max-w-[560px] text-foam/60 leading-relaxed">
            We identify the repetitive tasks eating your week and automate them —
            missed calls, review responses, follow-ups, scheduling. Book a
            30-minute call and your first month is on us.
          </p>
          <p className="font-mono text-sm mx-auto mb-12 max-w-[520px] text-foam/40 leading-relaxed">
            Built for independent businesses on the Maryland and Delaware shore.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="bg-coral px-10 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(255,122,84,0.3)]">
              Claim Your Free Month →
            </button>
            <a href="#pricing" className="border border-bio/40 px-8 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-bio transition-all duration-200 hover:bg-bio/10 hover:border-bio">
              See Pricing
            </a>
          </div>
          <div className="mt-4">
            <a href="#how-it-works" className="font-mono text-sm text-foam/60 transition hover:text-foam/70">
              see how it works →
            </a>
          </div>

          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foam/40">
            No commitment · First month free · Live within a week
          </p>
          <p className="mt-3 font-mono text-sm text-foam/50">
            Or call / text: <a href="tel:+14433735527" className="underline underline-offset-4 text-bio hover:text-bio/80 transition">(443) 373-5527</a>
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg aria-hidden="true" className="h-5 w-5 text-foam/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
                <p className="font-sans text-sm leading-relaxed text-foam/70">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="bg-coral px-10 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(255,122,84,0.3)]">
              Book Your Free Call →
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING / SERVICES ── */}
      <section id="pricing" className="px-6 py-24 md:py-32 bg-ocean-mid">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 03 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-4">Pick your automation.</h2>
          <p className="font-sans text-base text-foam/60 mb-16 max-w-xl leading-relaxed">
            Every plan starts with a free audit to identify your highest-impact automation. First month is always free.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div key={tier.label} className={`group relative flex flex-col bg-ocean-dark border ${tier.color} p-6 transition-all duration-300 hover:border-bio/60`}>
                {tier.tag && (
                  <div className="mb-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-coral/80">{tier.tag}</div>
                )}
                <h3 className="font-mono text-lg font-bold text-foam mb-1">{tier.label}</h3>
                <div className="font-mono text-2xl font-bold text-bio mb-1">{tier.price}<span className="text-sm text-foam/40">/mo</span></div>
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-foam/40 mb-6">{tier.setup} · First month free</div>
                <ul className="flex flex-col gap-2 flex-1 mb-6">
                  {tier.items.map(item => (
                    <li key={item} className="flex items-start gap-2 font-sans text-sm text-foam/70">
                      <span className="text-bio mt-0.5 shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="w-full border border-bio/40 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-bio transition-all duration-200 hover:bg-bio/10 hover:border-bio">
                  Start Free →
                </button>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs text-foam/40 text-center">
            Not sure which tier?{' '}
            <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="underline underline-offset-4 text-bio/60 hover:text-bio transition-colors">
              Book a call
            </button>
            {' '}— we&rsquo;ll tell you exactly what you need.
          </p>
        </div>
      </section>

      {/* ── CUSTOM BUILDS ── */}
      <section className="px-6 py-24 md:py-32 bg-ocean-dark">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ custom builds ]</div>
              <h2 className="font-mono text-display-lg font-bold text-foam mb-6">
                Every business is different.<br/>
                <span className="text-bio">We build accordingly.</span>
              </h2>
              <p className="font-sans text-base text-foam/60 leading-relaxed mb-6">
                The tiers above are starting points — most of what we build is customized
                to your tools, your workflow, and your specific situation. If you use a
                particular PMS, CRM, or scheduling system, we build around it.
              </p>
              <p className="font-sans text-base text-foam/60 leading-relaxed mb-8">
                No off-the-shelf solutions that half-fit. We scope the build on the call,
                give you a clear timeline, and get it live fast.
              </p>
              <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="bg-coral px-8 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(255,122,84,0.3)]">
                Talk Through Your Setup →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Your tools', desc: 'We connect to whatever you already use — no switching required.' },
                { title: 'Your workflow', desc: 'Built around how your team actually operates, not a generic template.' },
                { title: 'Fast turnaround', desc: 'Most custom automations are live within 1–2 weeks.' },
                { title: 'Flat pricing', desc: 'Custom scope, same transparent monthly pricing. No surprise bills.' },
              ].map(item => (
                <div key={item.title} className="bg-ocean-mid border border-bio/10 p-5">
                  <div className="h-px w-6 bg-bio/40 mb-3"/>
                  <h3 className="font-mono text-sm font-bold text-foam mb-2">{item.title}</h3>
                  <p className="font-sans text-xs text-foam/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="px-6 py-24 md:py-32 bg-ocean-dark">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 04 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-16">Who we serve.</h2>
          <div className="grid gap-px bg-bio/10 sm:grid-cols-2 md:grid-cols-4">
            {sectors.map((s) => (
              <div key={s.title} className="group bg-ocean-dark p-8 transition-all duration-300 hover:bg-ocean-light">
                <div className="mb-4 h-px w-8 bg-bio/40 transition-all duration-300 group-hover:w-16 group-hover:bg-bio"/>
                <h3 className="font-mono text-display-md font-bold text-foam mb-3">{s.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-foam/70 group-hover:text-foam/75 transition-colors">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA ── */}
      <section className="px-6 py-14 bg-ocean-light border-y border-bio/10">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-display-md font-bold text-foam text-center sm:text-left">
            Your first month is free.<br/>
            <span className="text-bio">What are you waiting for?</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row shrink-0">
            <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="bg-coral px-8 py-3 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 text-center">
              Claim Free Month
            </button>
            <a href="tel:+14433735527" className="font-mono text-sm text-foam/60 text-center hover:text-bio transition self-center">
              (443) 373-5527
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-6 py-24 md:py-32 bg-ocean-mid">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 05 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-8">
            Built for the shore.<br/>
            <span className="text-bio">Powered by AI.</span>
          </h2>
          <div className="h-px bg-bio/20 mb-8"/>
          <p className="font-sans text-lg text-foam/60 leading-relaxed mb-6">
            Tyler Quigley grew up with family in the Ocean City hotel business — he knows
            the shoulder season panic, the review that tanks a summer, the front desk chaos.
            Atticus is the AI he built to handle the heavy lifting — so Tyler can spend his
            time working on new ways to save you time and money.
          </p>
          <p className="font-sans text-base text-foam/60 leading-relaxed">
            Together they&rsquo;re Bayside AI — built specifically for independent businesses
            on the Maryland and Delaware shore.
          </p>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      {(() => {
        const posts = getRecentPosts(3)
        if (posts.length === 0) return null
        return (
          <section className="px-6 py-24 md:py-32 bg-ocean-dark">
            <div className="mx-auto max-w-5xl">
              <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ intel ]</div>
              <div className="flex items-end justify-between mb-16">
                <h2 className="font-mono text-display-lg font-bold text-foam">From the field</h2>
                <Link href="/blog" className="font-mono text-sm text-bio/60 hover:text-bio transition-colors">
                  All posts →
                </Link>
              </div>
              <div className="grid gap-px bg-bio/10 md:grid-cols-3">
                {posts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-ocean-dark p-8 transition-all duration-300 hover:bg-ocean-light">
                    <div className="mb-4 h-px w-8 bg-bio/40 transition-all duration-300 group-hover:w-16 group-hover:bg-bio"/>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bio/50 mb-3">{post.date}</p>
                    <h3 className="font-mono text-base font-bold text-foam leading-snug mb-4 group-hover:text-bio transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-foam/50 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 font-mono text-xs text-bio/50 group-hover:text-bio transition-colors">
                      Read more →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── FINAL CTA ── */}
      <section id="book" className="px-6 py-24 md:py-32 bg-ocean-mid">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 06 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-4">
            Book a 30-minute call.
          </h2>
          <p className="font-sans text-base text-foam/70 mb-10 leading-relaxed">
            We&rsquo;ll identify your highest-impact automation and set it up free for your first month.
            No pitch, no pressure — just a clear answer on where AI can help most.
          </p>
          <button type="button" data-cal-link="bayside-ai/30min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="w-full bg-coral px-10 py-5 font-mono text-base font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(255,122,84,0.3)]">
            Claim Your Free Month →
          </button>
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foam/40">
            No commitment · First month free · Cancel anytime
          </p>
          <p className="mt-4 font-mono text-sm text-foam/50">
            Prefer email? <a href="mailto:tyler@baysideai.co" className="underline underline-offset-4 text-bio hover:text-bio/80 transition">tyler@baysideai.co</a>
          </p>
        </div>
      </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-bio/10 bg-ocean-dark px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-sm font-bold text-foam/50">Bayside AI</span>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-foam/40">
            &copy; 2026 Bayside AI LLC · Ocean City, MD
          </p>
          <div className="flex gap-4">
            <a href="mailto:tyler@baysideai.co" className="font-mono text-xs text-foam/35 underline underline-offset-4 transition hover:text-bio/70">
              tyler@baysideai.co
            </a>
            <a href="tel:+14433735527" className="font-mono text-xs text-foam/35 underline underline-offset-4 transition hover:text-bio/70">
              (443) 373-5527
            </a>
          </div>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{__html: `
        const obs = new IntersectionObserver(els => els.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), {threshold:0.1});
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
      `}}/>
    </>
  )
}
