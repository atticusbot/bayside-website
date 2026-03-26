import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Frankford & Palmer — Caldwell & Associates | Case Study by Bayside AI",
  description:
    "Adaptive reuse of a 6,800 sq ft corner warehouse in Fishtown, Philadelphia into mixed-use residential and commercial space. A demo case study by Bayside AI.",
  openGraph: {
    title: "Frankford & Palmer — Adaptive Reuse Case Study",
    description:
      "6,800 sq ft warehouse conversion in Fishtown, Philadelphia. Mixed-use with ground-floor café and four residential units. Delivered at $1.18M.",
    type: "article",
    images: [
      {
        url: "/demo/case-study/exterior-draft.png",
        width: 1200,
        height: 630,
        alt: "Frankford & Palmer — Corner view, Frankford Avenue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frankford & Palmer — Adaptive Reuse Case Study",
    description:
      "6,800 sq ft warehouse conversion in Fishtown, Philadelphia. A demo case study by Bayside AI.",
    images: ["/demo/case-study/exterior-draft.png"],
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Frankford & Palmer — Adaptive Reuse Case Study",
  description:
    "Adaptive reuse of a 6,800 sq ft corner warehouse in Fishtown, Philadelphia into mixed-use residential and commercial space.",
  author: {
    "@type": "Organization",
    name: "Bayside AI",
    url: "https://www.baysideai.co",
  },
  about: {
    "@type": "Place",
    name: "Frankford & Palmer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      addressCountry: "US",
      streetAddress: "Fishtown",
    },
  },
  genre: "Architecture Case Study",
  keywords: [
    "adaptive reuse",
    "mixed-use",
    "historic preservation",
    "Fishtown Philadelphia",
    "architecture portfolio",
  ],
};

const specs = [
  { label: "Location", value: "Fishtown, Philadelphia PA" },
  { label: "Type", value: "Adaptive Reuse — Mixed-Use" },
  { label: "Size", value: "6,800 sq ft" },
  { label: "Units", value: "1 commercial + 4 residential" },
  { label: "Timeline", value: "14 months" },
  { label: "Budget", value: "$1.18M" },
  {
    label: "Services",
    value: "Full architecture, historic review coordination, interior design",
  },
  { label: "Award", value: "AIA Philadelphia Merit Award 2025" },
];

const galleryImages = [
  {
    src: "/demo/case-study/exterior-draft.png",
    alt: "Corner view, Frankford Avenue",
    caption: "Corner view, Frankford Avenue",
  },
  {
    src: "/demo/case-study/interior-residential-draft.png",
    alt: "Unit 3 — Open plan living",
    caption: "Unit 3 — Open plan living",
  },
  {
    src: "/demo/case-study/interior-cafe-draft.png",
    alt: "Ground floor café",
    caption: "Ground floor café",
  },
  {
    src: "/demo/case-study/detail-window-draft.png",
    alt: "Original steel meets new glass",
    caption: "Original steel meets new glass",
  },
];

export default function CaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="/demo/case-study/exterior-draft.png"
          alt="Frankford & Palmer — Corner view, Frankford Avenue"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark via-ocean-dark/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio">
              Caldwell &amp; Associates Architecture
            </p>
            <h1 className="font-mono text-display-xl font-bold text-foam">
              Frankford &amp; Palmer
            </h1>
            <p className="mt-3 font-sans text-xl text-foam/70 md:text-2xl">
              Adaptive Reuse — Fishtown, Philadelphia
            </p>
          </div>
        </div>
      </section>

      {/* The Brief */}
      <section className="bg-ocean-dark px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">
            The Brief
          </p>
          <p className="max-w-3xl font-sans text-xl leading-relaxed text-foam/80 md:text-2xl md:leading-relaxed">
            A developer acquired a decommissioned 6,800 sq ft corner warehouse
            on Frankford Avenue with plans to convert it into a mixed-use
            property. The ground floor would house a neighborhood café; the upper
            two floors would contain four rental units ranging from studios to
            one-bedrooms. The building sat vacant for nine years.
          </p>
        </div>
      </section>

      {/* Narrative + Specs — two-column on desktop */}
      <section className="bg-ocean-mid px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_320px] lg:gap-20">
          {/* Narrative */}
          <div className="space-y-16">
            <div>
              <p className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">
                The Challenge
              </p>
              <p className="font-sans text-lg leading-relaxed text-foam/70">
                The existing structure had no residential-grade HVAC, plumbing,
                or electrical. Load-bearing masonry walls limited interior
                reconfiguration. The Philadelphia Historical Commission flagged
                the facade as contributing to the Fishtown historic district,
                requiring exterior preservation. Budget was $1.2M with a
                14-month timeline.
              </p>
            </div>

            <div>
              <p className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">
                The Approach
              </p>
              <p className="font-sans text-lg leading-relaxed text-foam/70">
                Caldwell preserved the full brick facade and original
                steel-frame windows on the street-facing elevations while
                inserting floor-to-ceiling glass on the rear courtyard side. A
                new steel moment frame allowed removal of two interior bearing
                walls on the upper floors, opening up flexible unit layouts.
                Each unit received independent mini-split HVAC. The ground floor
                café design used the existing concrete slab and exposed ceiling
                joists, keeping buildout costs under $85/sq ft.
              </p>
            </div>

            <div>
              <p className="mb-4 font-mono text-label uppercase tracking-[0.2em] text-bio/60">
                The Result
              </p>
              <p className="font-sans text-lg leading-relaxed text-foam/70">
                Delivered on budget at $1.18M. All four units leased within 30
                days of CO at rents 12% above neighborhood comparable. The café
                tenant signed a 5-year NNN lease. The project received a 2025
                AIA Philadelphia Merit Award for adaptive reuse.
              </p>
            </div>
          </div>

          {/* Specs Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-ocean-light/20 bg-ocean-dark/50 p-8">
              <p className="mb-6 font-mono text-label uppercase tracking-[0.2em] text-bio/60">
                Project Details
              </p>
              <dl className="space-y-5">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="font-mono text-xs uppercase tracking-[0.15em] text-foam/40">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 font-sans text-sm text-foam/80">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-ocean-dark px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 font-mono text-label uppercase tracking-[0.2em] text-bio/60">
            Gallery
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {galleryImages.map((img) => (
              <figure key={img.src} className="group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-ocean-mid">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-foam/40">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Client Quote */}
      <section className="bg-ocean-mid px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-sans text-xl leading-relaxed text-foam/80 md:text-2xl md:leading-relaxed">
            &ldquo;We&rsquo;d been sitting on project photos for years with
            nothing to show for them online. Bayside turned each project into a
            page that actually brings in leads. Three new clients in the first
            quarter traced directly back to these case studies.&rdquo;
          </blockquote>
          <cite className="mt-8 block font-mono text-sm not-italic text-foam/50">
            — James Caldwell, AIA, Principal
          </cite>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ocean-dark px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-mono text-display-lg font-bold text-foam">
            This is what we build for architecture firms.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-foam/60">
            Every project in your portfolio is a page that can bring in new
            clients. We handle the writing, the design, the SEO, and the
            tracking.
          </p>
          <a
            href="https://cal.com/bayside-ai/15min"
            className="mt-10 inline-block bg-coral px-10 py-4 font-mono text-label font-bold uppercase tracking-[0.12em] text-ocean-dark transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(255,122,84,0.3)]"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="bg-ocean-dark px-6 pb-16 pt-4">
        <p className="mx-auto max-w-3xl text-center font-sans text-xs italic text-foam/30">
          This is a demo case study created by Bayside AI to illustrate our case
          study production service. Caldwell &amp; Associates is a fictional
          firm. Images are AI-generated.
        </p>
      </footer>
    </>
  );
}
