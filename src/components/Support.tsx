"use client";

import { useState } from "react";
import AppearAnimation from "./AppearAnimation";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "IS THE GAME PLAYABLE NOW?",
    answer:
      "The game is currently being tested and will be available soon. If you would like to help with testing. Contact us in discord or on X.",
  },
  {
    question: "DO I NEED CRYPTO TO BE ABLE TO PLAY?",
    answer:
      "DopeRaider uses USDC as the in game currency on the Base network. To play you will need to have some USDC in your wallet.",
  },
  {
    question: "HOW CAN I EARN MONEY WITH DOPERAIDER?",
    answer:
      "You can buy seeds or chemicals, produce dope and sell it at a market. You can trade by buying high and selling low. You can raid other players to steal some of their dope.",
  },
  {
    question: "IS IT FREE TO PLAY?",
    answer:
      "Actions in the game have a small cost to contribute to the overall economy. ",
  },
  {
    question: "WHAT'S NEXT TO COME?",
    answer:
      "Contact us on X/Discord or Telegram to get the latest updates.",
  },
];

const supportLinks = [
  {
    label: "DOPERAIDER WIKI ON GITBOOK",
    href: "https://doperaider.gitbook.io/doperaider",
  },
  {
    label: "ANNOUNCEMENTS TELEGRAM",
    href: "https://t.me/DopeRaiderGame",
  },
  {
    label: "EMAIL US: TEAM@DOPERAIDER.COM",
    href: "mailto:team@doperaider.com",
  },
];

const FAQAccordion = ({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div
    className={`w-full bg-black border  rounded-lg overflow-hidden cursor-pointer ${isOpen ? "border-[rgb(49,135,79)]" : "border-white/[0.15] hover:border-[rgb(49,135,79)]"}`}
    onClick={onClick}
  >
    <div className="flex flex-row items-center justify-between p-4">
      <p className="font-roboto text-base font-medium text-white tracking-[-0.01em]">
        {item.question}
      </p>
      <button
        className="flex items-center justify-center w-8 h-8 bg-[rgb(39,43,45)] rounded-full flex-shrink-0"
        aria-label={isOpen ? "Close" : "Open"}
      >
        <div className="relative w-3 h-3">

          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2" />

          <div
            className={`absolute top-0 left-1/2 w-0.5 h-full bg-white -translate-x-1/2 transition-transform duration-200 ${isOpen ? "scale-y-0" : "scale-y-100"
              }`}
          />
        </div>
      </button>
    </div>

    <div
      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      <div className="px-4 pb-4">
        <div
          className="h-px w-full mb-4"
          style={{
            background:
              "linear-gradient(90deg, rgb(34, 36, 38) 0%, rgba(34, 36, 38, 0) 100%)",
          }}
        />
        <p className="font-roboto text-[#ADADAD] text-sm leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  </div>
);

const SupportLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-row items-center justify-between w-full p-4 py-6 border border-white/[0.15] rounded-lg transition-all hover:border-white/30"
    style={{
      background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
    }}
  >
    <p className="font-roboto font-semibold text-white text-base">{label}</p>

    <svg viewBox="0 0 14.359 14.359" overflow="visible" width={15} height={15} className="mr-3">
      <path d="M 8.615 0 L 0 0 L 5.744 7.179 L 0 14.359 L 8.615 14.359 L 14.359 7.179 Z" fill="transparent"
        stroke-width="1.33" stroke="rgba(255, 255, 255, 0.5)" stroke-linecap="round" stroke-linejoin="round"
        stroke-dasharray="" />
    </svg>

  </a>
);

export default function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="support"
      className="flex flex-col items-start justify-start gap-8 w-full max-w-[1400px] mx-auto pt-60 pb-20 max-[809px]:pt-20 px-6"
    >
      <div className="flex flex-row items-start justify-between gap-16 w-full max-[809px]:flex-col">

        <AppearAnimation delay={0} duration={0.5} bounce={0.2} direction="up" className="flex flex-col items-start justify-start gap-6 w-1/2 max-[809px]:w-full">
          <h2 className="font-roboto font-black text-white text-[48px] leading-[44px] tracking-[-0.05em]">
            FAQ&apos;s
          </h2>
          <div className="flex flex-col items-start justify-start gap-3 w-full">
            {faqData.map((item, index) => (
              <FAQAccordion
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </AppearAnimation>

        <AppearAnimation delay={0.2} duration={0.5} bounce={0.2} direction="up" className="flex flex-col items-start justify-start gap-6 w-1/2 max-[809px]:w-full">
          <h2 className="font-roboto font-black text-white text-[48px] leading-[44px] tracking-[-0.05em]">
            SUPPORT
          </h2>
          <div className="flex flex-col items-start justify-start gap-3 w-full">
            {supportLinks.map((link, index) => (
              <SupportLink key={index} label={link.label} href={link.href} />
            ))}
          </div>
        </AppearAnimation>
      </div>
    </section>
  );
}