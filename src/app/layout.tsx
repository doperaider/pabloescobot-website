import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import StructuredData from "@/components/StructuredData";
import ReferralCookie from "@/components/ReferralCookie";

export const metadata: Metadata = {
  title: "DopeRaider - Respect has a price. | Play-to-Earn Web3 Game",
  description: "DopeRaider is a realtime on-chain multiplayer RPG strategy game where players produce, trade and raid dope to generate real income in a decentralized economy. Build your empire, raid rivals, and climb the leaderboard.",
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
  metadataBase: new URL("https://doperaider.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://doperaider.com",
    title: "DopeRaider - Respect has a price. | Play-to-Earn Web3 Game",
    description: "DopeRaider is a realtime on-chain multiplayer RPG strategy game where players produce, trade and raid dope to generate real income in a decentralized economy.",
    siteName: "DopeRaider",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DopeRaider - Build Your Empire in the Criminal Underworld",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DopeRaider - Respect has a price. | Play-to-Earn Web3 Game",
    description: "Build your empire in the criminal underworld. Produce, trade, and raid dope in this on-chain multiplayer RPG strategy game.",
    creator: "@doperaider",
    images: ["/images/og-image.jpg"],
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
