import type { Metadata } from "next";
import { Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://baysideai.co/#organization",
      "name": "Bayside AI",
      "description": "AI-powered reputation management and local search visibility for independent hotels, restaurants, retail shops, and experiences on the Maryland Eastern Shore.",
      "url": "https://baysideai.co",
      "email": "tyler@baysideai.co",
      "areaServed": [
        {"@type": "City", "name": "Ocean City", "addressRegion": "MD", "addressCountry": "US"},
        {"@type": "AdministrativeArea", "name": "Maryland Eastern Shore"},
        {"@type": "City", "name": "Ocean Pines", "addressRegion": "MD"},
        {"@type": "City", "name": "Berlin", "addressRegion": "MD"},
        {"@type": "City", "name": "Fenwick Island", "addressRegion": "DE"}
      ],
      "address": {"@type": "PostalAddress", "addressLocality": "Ocean City", "addressRegion": "MD", "addressCountry": "US"},
      "founder": {"@type": "Person", "name": "Tyler Quigley", "email": "tyler@baysideai.co"},
      "knowsAbout": ["AI search visibility","Generative Engine Optimization","GEO","reputation management","Google Business Profile optimization","local SEO","Ocean City MD tourism","review management","AI assistants and local search","TripAdvisor optimization","Booking.com optimization"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Bayside AI Services",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Reputation Management", "description": "Review monitoring, AI-generated owner responses, and guest sentiment analysis across Google, TripAdvisor, and Booking.com."}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Local and AI Search Visibility", "description": "Google Business Profile optimization, local SEO, and Generative Engine Optimization (GEO) so your business appears in ChatGPT, Perplexity, and Google AI Overviews."}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Guest Communication Automation", "description": "Pre-arrival, welcome, and follow-up email automation that drives reviews and repeat bookings."}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Free AI Visibility Audit", "description": "A complimentary 48-hour audit of your business online reputation, search rankings, and AI visibility."}}
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://baysideai.co/#website",
      "url": "https://baysideai.co",
      "name": "Bayside AI",
      "publisher": {"@id": "https://baysideai.co/#organization"}
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://baysideai.co"),
  title: "Bayside AI — AI for Ocean City, MD Businesses",
  description: "We manage your online reputation and visibility so you can focus on your guests. Built for Ocean City hotels, restaurants, shops, and experiences.",
  openGraph: {
    title: "Bayside AI — AI for Ocean City, MD Businesses",
    description: "We manage your online reputation and visibility so you can focus on your guests. Eight million tourists. One shore season. Your reputation is your season.",
    type: "website",
    url: "https://baysideai.co",
    siteName: "Bayside AI",
    images: [{url: "/opengraph-image", width: 1200, height: 630, alt: "Bayside AI — Your reputation is your season."}],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayside AI — AI for Ocean City, MD Businesses",
    description: "We manage your online reputation and visibility so you can focus on your guests. Your reputation is your season.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-J9N5HXVJCW" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J9N5HXVJCW');
        `}</Script>
        <Script id="cal-embed" strategy="afterInteractive">{`
          (function (C, A, L) {
            let p = function (a, ar) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
              let cal = C.Cal; let ar = arguments;
              if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
              if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", { origin: "https://cal.com" });
          Cal("ui", { theme: "dark", styles: { branding: { brandColor: "#3d9eff" } } });
        `}</Script>
      </body>
    </html>
  );
}
