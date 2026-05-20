import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const plexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.baysideai.co/#organization",
      "name": "Bayside AI",
      "description": "Bayside AI builds the operational and commercial infrastructure small professional firms need to operate in a more automated economy.",
      "url": "https://www.baysideai.co",
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
      "knowsAbout": ["professional service operations","workflow automation","website systems","proposal operations","client follow-up","firm knowledge management","local search visibility","reputation management"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Bayside AI Services",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Operating System Audit", "description": "A paid audit that maps workflows, market surface, firm memory, and reporting needs before implementation."}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Website and Workflow Systems", "description": "Connected website, intake, follow-up, reporting, and reusable firm memory for small professional firms."}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Local and Reputation Systems", "description": "Local visibility, review response workflows, and follow-up systems for service businesses and hospitality operators."}}
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.baysideai.co/#website",
      "url": "https://www.baysideai.co",
      "name": "Bayside AI",
      "publisher": {"@id": "https://www.baysideai.co/#organization"}
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.baysideai.co"),
  title: "Bayside AI | Embedded Operating Systems for Small Professional Firms",
  description: "Bayside builds the website, workflows, reporting, and firm memory as one connected operating layer for small professional service firms.",
  openGraph: {
    title: "Bayside AI | Embedded Operating Systems for Small Professional Firms",
    description: "Bayside builds the website, workflows, reporting, and firm memory as one connected operating layer.",
    type: "website",
    url: "https://www.baysideai.co",
    siteName: "Bayside AI",
    images: [{url: "/opengraph-image", width: 1200, height: 630, alt: "Bayside AI"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayside AI | Embedded Operating Systems for Small Professional Firms",
    description: "Bayside builds the website, workflows, reporting, and firm memory as one connected operating layer.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable}`}>
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
          Cal("ui", { theme: "light", styles: { branding: { brandColor: "#5A7D54" } } });
        `}</Script>
      </body>
    </html>
  );
}
