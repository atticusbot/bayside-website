import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
