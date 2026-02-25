import type { Metadata } from "next";
import { Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
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
  title: "Bayside AI — AI Consulting for Independent Hotels in Ocean City, MD",
  description:
    "We help independent hotels in Ocean City get found online, fix their reputation, and keep guests coming back — using AI systems that work while you sleep.",
  openGraph: {
    title: "Bayside AI — AI Consulting for Independent Hotels",
    description:
      "Get found online, fix your reputation, and keep guests coming back with AI-powered systems built for Ocean City hotels.",
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
