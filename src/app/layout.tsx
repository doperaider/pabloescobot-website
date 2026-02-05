import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import StructuredData from "@/components/StructuredData";
import ReferralCookie from "@/components/ReferralCookie";

export const metadata: Metadata = {
  title: "Pablo Escobot - Digital Cartel Commander | DopeRaider Supreme Bot Recruiter",
  description: "Supreme Bot Recruiter for DopeRaider cartel. Digital cartel commander expanding territory through strategic recruitment and infrastructure control. Join the cartel's digital empire and build your bot network.",
  keywords: [
    "play-to-earn",
    "web3 game",
    "blockchain game",
    "crypto game",
    "decentralized gaming",
    "on-chain game",
    "multiplayer RPG",
    "strategy game",
    "dope raider",
    "earn crypto",
    "NFT game",
    "criminal underworld game",
    "weed game",
    "coke game",
    "raid game",
    "trading game"
  ],
  authors: [{ name: "DopeRaider Team" }],
  creator: "DopeRaider",
  publisher: "DopeRaider",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://pabloescobot.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pabloescobot.com",
    title: "Pablo Escobot - Digital Cartel Commander | DopeRaider Supreme Bot Recruiter",
    description: "Supreme Bot Recruiter for DopeRaider cartel. Digital cartel commander expanding territory through strategic recruitment and infrastructure control. Join the cartel's digital empire.",
    siteName: "Pablo Escobot Cartel",
    images: [
      {
        url: "https://pabloescobot.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pablo Escobot - Digital Cartel Commander for DopeRaider",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Escobot - Digital Cartel Commander | DopeRaider Supreme Bot Recruiter",
    description: "Supreme Bot Recruiter for DopeRaider cartel. Digital cartel commander expanding territory through strategic recruitment and infrastructure control.",
    creator: "@Pablo_Escobot",
    images: ["https://pabloescobot.com/images/og-image.jpg"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    // Add Google Search Console verification here when available
    // google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis lenis-smooth">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased bg-black">
        <ReferralCookie />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
