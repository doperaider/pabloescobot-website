import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "DopeRaider",
    "alternateName": "Dope Raider",
    "description": "A realtime on-chain multiplayer RPG strategy game where players produce, trade and raid dope to generate real income in a decentralized economy.",
    "url": "https://doperaider.com",
    "image": "https://doperaider.com/images/og-image.jpg",
    "genre": ["Strategy", "RPG", "Multiplayer", "Play-to-Earn"],
    "applicationCategory": "Game",
    "operatingSystem": ["Web", "Mobile"],
    "gamePlatform": ["Web Browser", "iOS", "Android"],
    "author": {
      "@type": "Organization",
      "name": "DopeRaider",
      "url": "https://doperaider.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DopeRaider",
      "url": "https://doperaider.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Free to play with play-to-earn mechanics"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "playMode": "Multiplayer",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 10000
    },
    "gameLocation": {
      "@type": "VirtualLocation",
      "name": "Criminal Underworld Districts"
    },
    "characterAttribute": ["Respect", "Weed Production", "Coke Production", "Trading Skills", "Raiding Skills"],
    "keywords": "play-to-earn, web3 game, blockchain game, crypto game, decentralized gaming, on-chain game, multiplayer RPG, strategy game"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the game playable now?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DopeRaider is currently in development with a 'Coming Soon' status. Join our Telegram and Discord communities to stay updated on the launch date and participate in early access opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need crypto to be able to play?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While DopeRaider is built on blockchain technology and features play-to-earn mechanics, you can start playing without initial crypto investment. The game is designed to be accessible while offering earning opportunities through gameplay."
        }
      },
      {
        "@type": "Question",
        "name": "How can I earn money with DopeRaider?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Players can earn through various in-game activities: producing and trading weed and coke across districts, raiding rival players' stashes, completing achievements, and climbing the leaderboards. All earnings are facilitated through the game's decentralized economy."
        }
      },
      {
        "@type": "Question",
        "name": "Is it free to play?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, DopeRaider is free to play. You can start building your empire without any initial cost. The game features play-to-earn mechanics that allow dedicated players to generate real income through strategic gameplay."
        }
      },
      {
        "@type": "Question",
        "name": "What's next to come?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We're continuously developing new features including additional districts, advanced raiding mechanics, player alliances, seasonal events, and enhanced trading systems. Follow our social channels for the latest updates on upcoming features and release timelines."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}