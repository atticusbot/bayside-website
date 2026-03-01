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

export const metadata: Metadata = {
  title: "Bayside AI — AI for Ocean City, MD Businesses",
  description:
    "We manage your online reputation and visibility so you can focus on your guests. Built for Ocean City's hotels, restaurants, shops, and experiences.",
  openGraph: {
    title: "Bayside AI — AI for Ocean City, MD Businesses",
    description:
      "We manage your online reputation and visibility so you can focus on your guests. Eight million tourists. One shore season. Your reputation is your season.",
    type: "website",
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
