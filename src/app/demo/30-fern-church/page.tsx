import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "30 Fern Church — The Ramtin Group | Structural Engineering Case Study",
  description:
    "The Ramtin Group structural engineering case study for 30 Fern Church, an adaptive reuse and multi-family development project.",
  openGraph: {
    title: "30 Fern Church — The Ramtin Group",
    description:
      "Adaptive reuse and multi-family development structural engineering case study.",
    type: "article",
    images: [
      {
        url: "/demo/30-fern-church/30-fern-hero-exterior.png",
        width: 1200,
        height: 630,
        alt: "30 Fern Church exterior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "30 Fern Church — The Ramtin Group",
    description:
      "Adaptive reuse and multi-family development structural engineering case study.",
    images: ["/demo/30-fern-church/30-fern-hero-exterior.png"],
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "30 Fern Church — Structural Engineering Case Study",
  description:
    "The Ramtin Group structural engineering case study for 30 Fern Church, an adaptive reuse and multi-family development project.",
  author: {
    "@type": "Organization",
    name: "The Ramtin Group",
  },
  about: {
    "@type": "Project",
    name: "30 Fern Church",
    description:
      "Adaptive reuse, multi-family development; structural design, structural documentation, construction administration, temporary building shoring design, structural stabilization, and underpinning design.",
  },
  genre: "Engineering Case Study",
};

const specs = [
  { label: "Project", value: "30 Fern Church" },
  { label: "Firm", value: "The Ramtin Group" },
  { label: "Project Type", value: "Adaptive Reuse; Multi-family Development" },
  {
    label: "Services",
    value:
      "Structural Design; Structural Documentation; Construction Administration; Temporary Building Shoring Design; Structural Stabilization; Underpinning Design",
  },
  {
    label: "Primary Engineering Focus",
    value:
      "Existing structure stabilization, temporary works coordination, and permanent structural design for residential reuse",
  },
];

const galleryImages = [
  {
    src: "/demo/30-fern-church/30-fern-hero-exterior.png",
    alt: "Historic church exterior",
    caption: "Existing masonry character and public-facing envelope",
  },
  {
    src: "/demo/30-fern-church/30-fern-stabilization-detail.png",
    alt: "Structural stabilization and shoring",
    caption: "Temporary shoring, stabilization, and underpinning strategy",
  },
  {
    src: "/demo/30-fern-church/30-fern-adaptive-reuse-courtyard.png",
    alt: "Adaptive reuse context",
    caption: "Residential reuse introduced within a historic structural context",
  },
  {
    src: "/demo/30-fern-church/30-fern-structural-interior.png",
    alt: "Interior structural intervention",
    caption: "Interior structural intervention and load path coordination",
  },
];

export default function ThirtyFernChurchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
          .trg-page{--graphite:#151719;--charcoal:#232629;--copper:#C9792F;--copper-alt:#D68135;--amber:#F0A23A;--concrete:#E8E4DD;--paper:#FAF8F3;--steel:#4E6575;--line:#d9d1c7;--muted:#626765;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;color:var(--graphite);background:var(--paper);-webkit-font-smoothing:antialiased}.trg-page *{box-sizing:border-box}.trg-serif{font-family:Fraunces,Georgia,serif}.trg-wrap{max-width:1180px;margin:0 auto}.trg-hero{min-height:88vh;position:relative;display:flex;align-items:flex-end;overflow:hidden;background:var(--graphite)}.trg-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.86) contrast(1.08)}.trg-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(21,23,25,.9),rgba(21,23,25,.44),rgba(21,23,25,.08))}.trg-hero-copy{position:relative;z-index:2;width:100%;padding:0 28px 82px}.trg-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--copper);font-weight:600}.trg-hero .trg-eyebrow{color:rgba(250,248,243,.72)}.trg-h1{font-family:Fraunces,Georgia,serif;font-size:clamp(62px,10vw,124px);line-height:.86;letter-spacing:-.06em;color:var(--paper);margin:16px 0 0;max-width:900px}.trg-hero-sub{font-size:clamp(18px,2vw,24px);font-weight:300;color:rgba(250,248,243,.75);margin:20px 0 0}.trg-section{padding:96px 28px}.trg-intro{background:var(--paper)}.trg-intro-copy{font-family:Fraunces,Georgia,serif;font-size:clamp(26px,3vw,38px);line-height:1.28;letter-spacing:-.02em;color:var(--charcoal);max-width:940px;margin:18px 0 0}.trg-grid-section{background:linear-gradient(135deg,var(--concrete),#f1ede6);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.trg-two-col{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:84px}.trg-narrative{display:grid;gap:62px}.trg-narrative h2{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--copper);margin:0 0 16px}.trg-narrative p{font-size:18px;line-height:1.78;font-weight:400;color:#3f4644;margin:0}.trg-spec{position:sticky;top:28px;align-self:start;background:rgba(250,248,243,.78);backdrop-filter:blur(8px);border:1px solid var(--line);border-top:3px solid var(--copper);padding:32px;box-shadow:0 24px 70px rgba(21,23,25,.08)}.trg-spec h2{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--copper);margin:0 0 24px}.trg-spec dl{margin:0;display:grid;gap:21px}.trg-spec dt{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#7a7f7c}.trg-spec dd{margin:7px 0 0;font-size:14px;line-height:1.5;color:var(--charcoal)}.trg-capabilities{background:var(--charcoal);color:var(--paper)}.trg-capability-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(250,248,243,.16);border:1px solid rgba(250,248,243,.16)}.trg-capability-card{background:var(--charcoal);padding:30px}.trg-capability-card b{display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--amber);margin-bottom:14px}.trg-capability-card p{margin:0;color:rgba(250,248,243,.75);line-height:1.65;font-size:15px}.trg-gallery{background:var(--paper)}.trg-gallery-head{display:flex;justify-content:space-between;gap:40px;align-items:end;margin-bottom:34px}.trg-gallery-head p{max-width:520px;line-height:1.65;color:var(--muted);margin:0}.trg-gallery-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:18px}.trg-gallery figure{margin:0;background:#fff;border:1px solid var(--line);overflow:hidden}.trg-gallery figure:first-child{grid-row:span 2}.trg-photo{aspect-ratio:4/3;background:var(--concrete);overflow:hidden}.trg-gallery figure:first-child .trg-photo{height:100%;aspect-ratio:auto}.trg-photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s ease}.trg-gallery figure:hover img{transform:scale(1.025)}.trg-gallery figcaption{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--steel);padding:14px 16px}.trg-quote{background:var(--graphite);color:var(--paper);padding:100px 28px}.trg-quote blockquote{font-family:Fraunces,Georgia,serif;font-size:clamp(34px,5vw,62px);line-height:1.04;letter-spacing:-.04em;max-width:980px;margin:0 auto}.trg-quote cite{display:block;max-width:980px;margin:30px auto 0;font-style:normal;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(250,248,243,.46)}.trg-footer{background:var(--charcoal);color:var(--paper);padding:54px 28px}.trg-footer-card{display:grid;grid-template-columns:1fr auto;gap:36px;align-items:center}.trg-footer h2{font-family:Fraunces,Georgia,serif;font-size:34px;line-height:1;letter-spacing:-.03em;margin:0}.trg-footer p{max-width:640px;color:rgba(250,248,243,.66);line-height:1.65;margin:10px 0 0}.trg-button{display:inline-block;color:var(--paper);text-decoration:none;border:1px solid rgba(250,248,243,.24);padding:14px 18px;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase}.trg-note{font-size:12px;color:#767b78;line-height:1.7;margin-top:26px;max-width:760px}.trg-badge{display:inline-block;background:rgba(201,121,47,.12);border:1px solid rgba(201,121,47,.36);color:#9c5b20;padding:7px 10px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;margin-top:22px}@media(max-width:900px){.trg-two-col,.trg-footer-card,.trg-gallery-grid,.trg-capability-grid{grid-template-columns:1fr}.trg-spec{position:static}.trg-gallery figure:first-child{grid-row:auto}.trg-gallery figure:first-child .trg-photo{aspect-ratio:4/3}.trg-gallery-head{display:block}.trg-section{padding:74px 20px}.trg-hero-copy{padding:0 20px 58px}.trg-hero{min-height:620px}}
        `,
        }}
      />
      <main className="trg-page">
        <section className="trg-hero">
          <img
            src="/demo/30-fern-church/30-fern-hero-exterior.png"
            alt="30 Fern Church exterior"
          />
          <div className="trg-hero-copy">
            <div className="trg-wrap">
              <div className="trg-eyebrow">
                The Ramtin Group · Structural Engineering
              </div>
              <h1 className="trg-h1">30 Fern Church</h1>
              <p className="trg-hero-sub">
                Adaptive Reuse / Multi-family Development
              </p>
            </div>
          </div>
        </section>

        <section className="trg-section trg-intro">
          <div className="trg-wrap">
            <div className="trg-eyebrow">The Brief</div>
            <p className="trg-intro-copy">
              30 Fern Church called for structural engineering that could
              support a new residential program while respecting the existing
              masonry character of a historic church building. The work required
              more than documentation; it required a coordinated stabilization,
              shoring, and underpinning strategy that could make adaptive reuse
              buildable.
            </p>
            <div className="trg-badge">Adaptive reuse · Multi-family development</div>
          </div>
        </section>

        <section className="trg-section trg-grid-section">
          <div className="trg-wrap trg-two-col">
            <main className="trg-narrative">
              <article>
                <h2>The Challenge</h2>
                <p>
                  Church-to-residential conversions concentrate multiple
                  structural priorities in a single envelope: preserving
                  exterior character, stabilizing existing masonry, protecting
                  adjacent conditions, supporting new residential loads and
                  layouts, and sequencing construction safely around an existing
                  shell. On 30 Fern Church, the structural scope included
                  temporary building shoring, structural stabilization, and
                  underpinning in addition to the core design and documentation
                  package.
                </p>
              </article>
              <article>
                <h2>The Approach</h2>
                <p>
                  Our work focused on translating the preservation intent into a
                  buildable structural strategy. That meant documenting existing
                  conditions, defining stabilization requirements, coordinating
                  temporary shoring, designing permanent interventions, and
                  supporting the construction team through administration and
                  field coordination. The goal was to reduce uncertainty before
                  it reached the site.
                </p>
              </article>
              <article>
                <h2>The Structural Role</h2>
                <p>
                  For adaptive reuse projects, the most important engineering
                  decisions often happen before the finished building is visible.
                  Shoring, underpinning, structural stabilization, and sequencing
                  determine whether the architectural vision can move through
                  construction without compromising safety, schedule, or the
                  existing structure. 30 Fern Church is representative of that
                  kind of structural judgment.
                </p>
              </article>
            </main>
            <aside className="trg-spec">
              <h2>Project Details</h2>
              <dl>
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="trg-section trg-capabilities">
          <div className="trg-wrap">
            <div className="trg-eyebrow">Engineering Signals</div>
            <div style={{ height: 26 }} />
            <div className="trg-capability-grid">
              <div className="trg-capability-card">
                <b>Adaptive Reuse</b>
                <p>
                  Engineering support for projects where existing structure,
                  preservation value, and new program requirements have to be
                  reconciled.
                </p>
              </div>
              <div className="trg-capability-card">
                <b>Temporary Works</b>
                <p>
                  Shoring and stabilization strategy to help owners, architects,
                  and contractors manage risk before and during construction.
                </p>
              </div>
              <div className="trg-capability-card">
                <b>Construction Administration</b>
                <p>
                  Field-phase coordination that keeps structural decisions
                  connected to site realities as conditions are uncovered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="trg-section trg-gallery">
          <div className="trg-wrap">
            <div className="trg-gallery-head">
              <div>
                <div className="trg-eyebrow">Gallery</div>
                <h2 className="trg-serif" style={{ fontSize: 46, lineHeight: 1, margin: "12px 0 0", letterSpacing: "-0.04em", color: "var(--graphite)" }}>
                  From landmark shell to buildable reuse.
                </h2>
              </div>
              <p>
                Adaptive reuse depends on making the existing structure legible:
                what can remain, what must be stabilized, where new loads travel,
                and how temporary works protect the building while the future
                program is introduced.
              </p>
            </div>
            <div className="trg-gallery-grid">
              {galleryImages.map((image) => (
                <figure key={image.src}>
                  <div className="trg-photo">
                    <img src={image.src} alt={image.alt} />
                  </div>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="trg-note">
              Note: final publication should use confirmed project photography,
              status, team credits, and measurable project outcomes where
              available.
            </p>
          </div>
        </section>

        <section className="trg-quote">
          <blockquote>
            Adaptive reuse succeeds when structural risk is understood early,
            stabilized carefully, and carried through construction with
            discipline.
          </blockquote>
          <cite>The Ramtin Group · Structural Engineering</cite>
        </section>

        <section className="trg-footer">
          <div className="trg-wrap trg-footer-card">
            <div>
              <h2>The Ramtin Group</h2>
              <p>
                Detailed approach, big picture aware. Structural engineering for
                adaptive reuse, multi-family development, commercial work,
                restoration, and complex existing conditions.
              </p>
            </div>
            <a className="trg-button" href="https://www.theramtingroup.com/projects">
              View Projects
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
