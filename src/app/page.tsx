export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-t-4 border-gold bg-warm/90 backdrop-blur-md border-b border-navy/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-xl font-semibold tracking-tight text-navy">
            Bayside AI
          </span>
          <a
            href="#audit"
            className="bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy transition hover:bg-gold/85"
          >
            Get Your Free Audit
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2744] px-6">
          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-gold">
              AI for Ocean City Hotels
            </p>
            <h1 className="font-display leading-tight text-warm">
              <span className="block text-5xl font-bold md:text-6xl lg:text-7xl">
                Your guests are talking.
              </span>
              <span className="block text-5xl font-bold italic text-gold/90 md:text-6xl lg:text-7xl">
                Are you listening?
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-warm/70">
              We help independent hotels in Ocean City get found online, fix
              their reputation, and keep guests coming back&nbsp;&mdash; using AI
              systems that work while you sleep.
            </p>
            <a
              href="#audit"
              className="mt-10 inline-block bg-gold px-10 py-4 text-xs font-semibold uppercase tracking-widest text-navy transition hover:bg-gold/85"
            >
              Get Your Free Audit
            </a>
            <p className="mt-5 text-sm text-warm/40">
              No commitment. Delivered in 48 hours.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="h-6 w-6 text-warm/30" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </section>

        {/* ── PROBLEMS ── */}
        <section className="bg-navy px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display mb-14 text-center text-3xl font-bold text-warm md:text-4xl">
              Sound familiar?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { num: "01", text: "No time to respond to reviews" },
                { num: "02", text: "You show up on page 2, or not at all" },
                { num: "03", text: "Guests forget you exist after checkout" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="relative overflow-hidden rounded-none border border-warm/10 bg-warm/5 p-8"
                >
                  <span className="pointer-events-none absolute -bottom-4 -right-2 select-none font-display text-[7rem] font-bold leading-none text-warm/5">
                    {item.num}
                  </span>
                  <p className="font-display relative text-xl font-medium italic text-warm">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display mb-14 text-center text-3xl font-bold text-navy md:text-4xl">
              How it works
            </h2>
            <div className="grid gap-12 md:grid-cols-3 md:gap-8">
              {[
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
              ].map((item) => (
                <div key={item.step} className="relative pt-8">
                  <span className="pointer-events-none absolute top-0 left-0 select-none font-display text-[8rem] font-bold leading-none text-navy/5">
                    {item.step}
                  </span>
                  <div className="relative">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
                      Step {item.step}
                    </p>
                    <h3 className="font-display mb-3 text-xl font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-navy/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-[#f0f4f8] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display mb-14 text-center text-3xl font-bold text-navy md:text-4xl">
              What we do
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
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
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-4 border-gold bg-warm p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-display mb-3 text-lg font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-navy/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="relative overflow-hidden bg-navy px-6 py-24 md:py-32">
          <span className="pointer-events-none absolute -top-8 left-4 select-none font-display text-[16rem] font-bold leading-none text-warm/5">
            &ldquo;
          </span>
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 h-px w-16 bg-gold" />
            <h2 className="font-display mb-6 text-3xl font-bold italic text-warm md:text-4xl">
              Built for Ocean City. Powered by AI.
            </h2>
            <p className="text-lg leading-relaxed text-warm/70">
              We are Tyler and Atticus&nbsp;&mdash; a founder with deep roots in
              Ocean City hospitality and an AI built to run the operation. Every
              audit, report, and email is generated by AI and reviewed for
              accuracy before it reaches your business.
            </p>
          </div>
        </section>

        {/* ── FREE AUDIT CTA ── */}
        <section id="audit" className="bg-[#f0f4f8] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-navy md:text-4xl">
              Find out what guests really think about your hotel.
            </h2>
            <p className="mb-10 text-lg text-navy/60">
              We&rsquo;ll pull your reviews, check your search visibility, and
              tell you exactly what to fix&nbsp;&mdash; for free.
            </p>
            <form
              action="mailto:tyler@baysideai.co"
              method="POST"
              encType="text/plain"
              className="mx-auto grid max-w-md gap-5"
            >
              {["Your name", "Hotel name", "Email address"].map((placeholder, i) => (
                <input
                  key={placeholder}
                  type={i === 2 ? "email" : "text"}
                  name={i === 0 ? "name" : i === 1 ? "hotel" : "email"}
                  required
                  placeholder={placeholder}
                  className="border-b-2 border-navy/20 bg-transparent px-0 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors"
                />
              ))}
              <button
                type="submit"
                className="mt-2 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-navy transition hover:bg-gold/85"
              >
                Get My Free Audit
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t-4 border-gold bg-navy px-6 py-8">
        <p className="text-center text-sm text-warm/50">
          &copy; 2026 Bayside AI LLC &middot; Ocean City, MD &middot;{" "}
          <a
            href="mailto:tyler@baysideai.co"
            className="underline underline-offset-2 transition hover:text-warm/80"
          >
            tyler@baysideai.co
          </a>
        </p>
      </footer>

      {/* Scroll reveal */}
      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          }, { threshold: 0.1 });
          document.querySelectorAll('.reveal').forEach(function(el) {
            observer.observe(el);
          });
        })();
      `}} />
    </>
  );
}
