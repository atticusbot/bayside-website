import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import AuditForm from './audit-form'

export const metadata: Metadata = {
  title: 'Bayside AI — AI for Ocean City, MD Businesses',
  description: 'We help independent businesses on the East Coast get found online, fix their reputation, and keep customers coming back.',
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
  { label: '01', title: 'Visibility & Reputation', desc: 'Review monitoring, owner responses, Google Business Profile optimization, local SEO, and GEO — so you show up everywhere customers are looking, including AI assistants.' },
  { label: '02', title: 'Operations Automation', desc: 'Booking follow-ups, automated review responses, social scheduling, and reporting. Repetitive tasks handled by AI so your team can focus on guests.' },
  { label: '03', title: 'AI Strategy', desc: 'We map where AI can save you the most time and money, then build and implement the systems — custom to your business, not a generic tool.' },
]

const sectors = [
  { title: 'Hotels', desc: 'Independent and boutique properties. We know this business from the inside.' },
  { title: 'Restaurants', desc: 'From boardwalk staples to waterfront dining. Be the first place tourists find when they\'re deciding where to eat.' },
  { title: 'Retail & Service', desc: 'Shops, salons, spas. Your next customer is searching right now.' },
  { title: 'Experiences', desc: 'Mini golf, boat tours, arcades, activities. Make every search lead here.' },
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
            <button type="button" data-cal-link="bayside-ai/15min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="hidden sm:block font-mono text-label font-bold uppercase tracking-[0.12em] text-foam/50 transition-all duration-200 hover:text-bio">
              Book a Call
            </button>
            <a href="#audit" className="border border-bio/40 px-5 py-2 text-label font-mono font-bold uppercase tracking-[0.12em] text-bio transition-all duration-200 hover:bg-bio/10 hover:border-bio">
              Free Audit
            </a>
          </div>
        </div>
      </nav>

      <main>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">


        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Section label */}
          <div className="mb-10 inline-flex items-center gap-3">
            <div className="h-px w-6 bg-bio/40"/>
            <span className="font-mono text-label uppercase tracking-[0.2em] text-bio/70">[ AI Automation for the Eastern Shore ]</span>
            <div className="h-px w-6 bg-bio/40"/>
          </div>

          {/* Headline with word-level highlight */}
          <h1 className="font-mono text-display-xl font-bold mb-10">
            <span className="block text-foam mb-6 leading-[1.1]">Your guests are talking.</span>
            <span className="block sm:inline-block bg-bio/15 border border-bio/30 px-4 py-3 text-bio leading-[1.1] sm:whitespace-nowrap">Are you listening?</span>
          </h1>

          <p className="font-sans text-lg mx-auto mb-4 max-w-[560px] text-foam/60 leading-relaxed">
            We help independent businesses on the shore automate operations,
            manage their reputation, and get found online — so you can focus
            on running the place.
          </p>
          <p className="font-mono text-sm mx-auto mb-12 max-w-[520px] text-foam/35 leading-relaxed">
            Built for hotels, restaurants, and shops on the Maryland and Delaware shore.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#audit" className="bg-coral px-10 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(255,122,84,0.3)]">
              Get Your Free Audit
            </a>
            <button type="button" data-cal-link="bayside-ai/15min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="border border-bio/40 px-8 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-bio transition-all duration-200 hover:bg-bio/10 hover:border-bio">
              Book a Call
            </button>
          </div>
          <div className="mt-4">
            <a href="#how-it-works" className="font-mono text-sm text-foam/60 transition hover:text-foam/70">
              see how it works →
            </a>
          </div>

          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foam/40">
            No commitment · Delivered in 48 hours
          </p>
          <p className="mt-3 font-mono text-sm text-foam/50">
            Or call / text us: <a href="tel:+14433735527" className="underline underline-offset-4 text-bio hover:text-bio/80 transition">(443) 373-5527</a>
          </p>
        </div>

        {/* Scroll chevron */}
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
                <div className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bio/50">[ {s.label} ]</div>
                <h3 className="font-mono text-display-md font-bold text-foam mb-3">{s.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-foam/70 group-hover:text-foam/75 transition-colors">{s.desc}</p>
              </div>
            ))}
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

      {/* ── MID-PAGE CTA STRIP ── */}
      <section className="px-6 py-14 bg-ocean-light border-y border-bio/10">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-display-md font-bold text-foam text-center sm:text-left">
            Ready to see what&rsquo;s holding you back?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row shrink-0">
            <a href="#audit" className="bg-coral px-8 py-3 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 text-center">
              Get Free Audit
            </a>
            <button type="button" data-cal-link="bayside-ai/15min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="border border-bio/40 px-8 py-3 font-mono text-label font-bold uppercase tracking-[0.12em] text-bio transition-all duration-200 hover:bg-bio/10 hover:border-bio">
              Book a Call
            </button>
            <a href="tel:+14433735527" className="font-mono text-sm text-foam/50 text-center hover:text-bio transition">
              Call or text: (443) 373-5527
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

      {/* ── AUDIT FORM ── */}
      <section id="audit" className="px-6 py-24 md:py-32 bg-ocean-mid">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">[ 06 ]</div>
          <h2 className="font-mono text-display-lg font-bold text-foam mb-4">
            Find out what customers really think.
          </h2>
          <p className="font-sans text-base text-foam/70 mb-12 leading-relaxed">
            We&rsquo;ll pull your reviews, check your search visibility, and tell you
            exactly what to fix — for free. Delivered in 48 hours.
          </p>
          <AuditForm />
          <div className="mt-10 pt-8 border-t border-bio/10 text-center">
            <p className="font-mono text-sm text-foam/60 mb-3">Prefer to talk first?</p>
            <button type="button" data-cal-link="bayside-ai/15min" data-cal-config={JSON.stringify({layout:"popup_widget"})} className="font-mono text-sm text-bio/60 hover:text-bio transition-colors underline underline-offset-4">
              Book a 15-min call →
            </button>
          </div>
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

      {/* Scroll reveal script */}
      <script dangerouslySetInnerHTML={{__html: `
        const obs = new IntersectionObserver(els => els.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), {threshold:0.1});
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
      `}}/>
    </>
  )
}
