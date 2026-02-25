export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm/90 backdrop-blur-md border-b border-navy/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-semibold tracking-tight text-navy">
            Bayside AI
          </span>
          <a
            href="#audit"
            className="rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-navy transition hover:bg-gold/85"
          >
            Get Your Free Audit
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="px-6 pb-24 pt-36 md:pb-32 md:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-navy md:text-5xl lg:text-6xl">
              Your guests are talking.
              <br />
              Are you listening?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy/70 md:text-xl">
              We help independent hotels in Ocean City get found online, fix
              their reputation, and keep guests coming back&nbsp;&mdash; using AI
              systems that work while you sleep.
            </p>
            <a
              href="#audit"
              className="mt-8 inline-block rounded-md bg-gold px-8 py-3.5 text-base font-medium text-navy transition hover:bg-gold/85"
            >
              Get Your Free Audit
            </a>
            <p className="mt-4 text-sm text-navy/50">
              No commitment. Delivered in 48 hours.
            </p>
          </div>
        </section>

        {/* ── PROBLEMS ── */}
        <section className="bg-navy px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-14 text-center text-3xl font-bold text-warm md:text-4xl">
              Sound familiar?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: (
                    <svg
                      className="h-8 w-8 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  ),
                  text: "No time to respond to reviews",
                },
                {
                  icon: (
                    <svg
                      className="h-8 w-8 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  ),
                  text: "You show up on page 2, or not at all",
                },
                {
                  icon: (
                    <svg
                      className="h-8 w-8 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                      />
                    </svg>
                  ),
                  text: "Guests forget you exist after checkout",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="rounded-xl border border-warm/10 bg-warm/5 p-8 text-center"
                >
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <p className="text-lg font-medium text-warm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-14 text-center text-3xl font-bold text-navy md:text-4xl">
              How it works
            </h2>
            <div className="grid gap-12 md:grid-cols-3">
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
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-warm">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-navy/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-navy/[0.03] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-14 text-center text-3xl font-bold text-navy md:text-4xl">
              What we do
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Reputation & Reviews",
                  desc: "Monitor and respond to reviews across every platform — Google, TripAdvisor, Booking.com, and more.",
                  icon: (
                    <svg
                      className="h-7 w-7 text-slate"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Local SEO & AI Search",
                  desc: "Show up when guests search on Google, Maps, and AI tools like ChatGPT and Perplexity.",
                  icon: (
                    <svg
                      className="h-7 w-7 text-slate"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Guest Communication",
                  desc: "Pre-arrival, welcome, and post-stay emails that bring guests back season after season.",
                  icon: (
                    <svg
                      className="h-7 w-7 text-slate"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-navy/10 bg-warm p-8"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-navy/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-navy md:text-4xl">
              Built for Ocean City. Powered by AI.
            </h2>
            <p className="text-lg leading-relaxed text-navy/70">
              We are Tyler and Atticus&nbsp;&mdash; a founder with deep roots in
              Ocean City hospitality and an AI built to run the operation. Every
              audit, report, and email is generated by AI and reviewed for
              accuracy before it reaches your business.
            </p>
          </div>
        </section>

        {/* ── FREE AUDIT CTA ── */}
        <section id="audit" className="bg-navy px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-warm md:text-4xl">
              Find out what guests really think about your hotel.
            </h2>
            <p className="mb-10 text-lg text-warm/70">
              We&rsquo;ll pull your reviews, check your search visibility, and
              tell you exactly what to fix&nbsp;&mdash; for free.
            </p>
            <form
              action="mailto:tyler@baysideai.co"
              method="POST"
              encType="text/plain"
              className="mx-auto grid max-w-md gap-4"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="rounded-md border border-warm/20 bg-warm/10 px-4 py-3 text-warm placeholder:text-warm/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <input
                type="text"
                name="hotel"
                required
                placeholder="Hotel name"
                className="rounded-md border border-warm/20 bg-warm/10 px-4 py-3 text-warm placeholder:text-warm/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="rounded-md border border-warm/20 bg-warm/10 px-4 py-3 text-warm placeholder:text-warm/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button
                type="submit"
                className="rounded-md bg-gold px-8 py-3.5 text-base font-medium text-navy transition hover:bg-gold/85"
              >
                Get My Free Audit
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-navy/5 bg-warm px-6 py-8">
        <p className="text-center text-sm text-navy/50">
          &copy; 2026 Bayside AI LLC &middot; Ocean City, MD &middot;{" "}
          <a
            href="mailto:tyler@baysideai.co"
            className="underline underline-offset-2 transition hover:text-navy/70"
          >
            tyler@baysideai.co
          </a>
        </p>
      </footer>
    </>
  );
}
