"use client";

import Link from "next/link";
import AppearAnimation from "./AppearAnimation";

export default function Hero() {
  return (
    <section 
      id="top"
      className="relative flex flex-col items-center justify-end w-full h-[95vh] max-[809px]:h-[85vh] bg-black overflow-visible p-16 max-[1199px]:p-8 max-[809px]:p-6"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[214px] z-[2] overflow-hidden gradient-bottom-fade" />

      <div className="flex flex-col items-start justify-center gap-2.5 max-w-[1400px] w-full overflow-hidden relative z-[2]">
        <div className="flex flex-col items-start justify-center gap-0 w-auto overflow-visible z-[2] max-[1199px]:items-center max-[1199px]:w-full max-[1199px]:gap-4 max-[1199px]:p-8 max-[809px]:items-center max-[809px]:w-full max-[809px]:gap-4">
          
          <AppearAnimation delay={0} duration={0.4} bounce={0.2} direction="up">
            <p className="font-roboto text-[#ADADAD] text-[20px] leading-[26px] tracking-[-0.01em] max-w-[845px] w-full whitespace-pre-wrap font-semibold max-[1199px]:text-center max-[809px]:text-center max-[809px]:w-full">
              A PLAY TO EARN WEB3 GAME
            </p>
          </AppearAnimation>

          <AppearAnimation delay={0.1} duration={0.4} bounce={0.2} direction="up">
            <h1 className="font-roboto text-white text-[128px] leading-[1] tracking-[-0.05em] max-w-[845px] w-full whitespace-pre-wrap font-black max-[1199px]:text-[100px] max-[1199px]:leading-[0.9em] max-[1199px]:text-center max-[809px]:text-[64px] max-[809px]:leading-[0.9em] max-[809px]:text-center max-[809px]:w-full">
              BUILD AN EMPIRE
            </h1>
          </AppearAnimation>

          <AppearAnimation delay={0.2} duration={0.4} bounce={0.2} direction="up" className="block min-[1200px]:hidden mt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-9 py-1 rounded-[74px] border border-black overflow-hidden will-change-transform hover:opacity-90 transition-opacity gradient-cta"
            >
              <span className="font-bangers text-white text-[32px] whitespace-pre">
                COMING SOON
              </span>
            </Link>
          </AppearAnimation>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full z-[1]">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover object-center block"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
