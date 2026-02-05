"use client";

import Image from "next/image";
import AppearAnimation from "./AppearAnimation";

const CardBorder = () => (
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[144px] max-[809px]:h-full w-full">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 213 144"
      preserveAspectRatio="none"
      fill="none"
      className="w-full h-full"
    >
      <path
        d="M212.495 95.5674L212.494 95.5674C212.352 101.651 212.285 111.694 211.367 120.946C210.908 125.572 210.238 129.98 209.246 133.583C208.247 137.212 206.946 139.921 205.298 141.265C205.056 141.461 204.634 141.656 204 141.827C203.376 141.996 202.588 142.13 201.651 142.231C199.778 142.434 197.356 142.5 194.549 142.462C188.937 142.385 181.842 141.893 174.635 141.273C167.429 140.654 160.126 139.909 154.096 139.329C148.086 138.751 143.304 138.332 141.186 138.375C125.929 138.65 101.505 140.944 77.2754 142.366C52.9994 143.791 28.9269 144.341 14.2402 141.164L14.1875 141.152L14.1338 141.152C9.25346 141.152 6.15188 139.394 4.17968 136.448C2.17956 133.461 1.29834 129.19 1.04101 124.094C0.784232 119.008 1.15067 113.178 1.58496 107.12C2.01838 101.074 2.51855 94.8035 2.51855 88.8799L2.51855 88.626L2.33789 88.4932C2.33049 88.4813 2.31087 88.4485 2.2832 88.3818C2.23462 88.2648 2.18136 88.0941 2.12695 87.8652C2.01848 87.4088 1.91712 86.7785 1.82421 86.0137C1.63885 84.4875 1.49224 82.4762 1.3789 80.3535C1.15238 76.1108 1.05974 71.4593 1.04199 69.4336L1.04199 69.4326C0.970379 61.5602 -0.138586 36.6824 1.03906 25.0517L1.04004 25.041L1.06445 24.8408C1.08182 24.6997 1.10728 24.4909 1.14258 24.2246C1.21318 23.6919 1.32009 22.9263 1.46484 21.9971C1.75451 20.1376 2.19569 17.626 2.80078 15.0127C3.40658 12.3963 4.1732 9.69342 5.11133 7.4453C6.02966 5.24465 7.07527 3.57901 8.21387 2.79687C10.2725 2.80358 17.0976 2.93484 23.6299 3.00194C26.9766 3.03632 30.2435 3.05317 32.7393 3.02734C33.9863 3.01443 35.0464 2.99118 35.8291 2.95312C36.2194 2.93413 36.5477 2.91063 36.7988 2.8828C36.924 2.86893 37.038 2.85383 37.1338 2.83495C37.1946 2.82296 37.2763 2.80472 37.3564 2.77343L37.4355 2.7373C37.7917 2.55213 38.4027 2.36251 39.2793 2.18163C40.1478 2.00243 41.2399 1.83907 42.5293 1.69042C45.1074 1.39321 48.4475 1.15969 52.3164 0.981438C60.0527 0.625019 69.8756 0.490405 79.8896 0.500971C99.9251 0.522114 120.683 1.12447 126.991 1.69336L126.993 1.69336C131.896 2.11735 151.706 2.63196 170.601 3.53418C180.061 3.9859 189.3 4.53476 196.358 5.21875C199.889 5.56089 202.862 5.93574 205.04 6.34668C206.13 6.55239 207.007 6.7647 207.649 6.98145C207.971 7.08986 208.222 7.1954 208.407 7.2959C208.553 7.37524 208.639 7.44043 208.685 7.48535C212.498 16.4691 212.431 28.4624 211.42 40.5332C210.913 46.5764 210.174 52.6016 209.579 58.2627C208.985 63.9126 208.536 69.1979 208.616 73.7158L208.617 73.7148C208.672 77.1344 209.708 80.633 210.68 84.2187C211.658 87.8296 212.582 91.5643 212.495 95.5674Z"
        stroke="white"
        strokeOpacity="0.2"
      />
    </svg>
  </div>
);

interface CardProps {
  imageSrc: string;
  label: string;
  width: number;
  className?: string;
  height: number;
}

const Card = ({ imageSrc, label, width, height, className }: CardProps) => (
  <div className="flex gap-2 w-[160px] shrink-0 flex-col mx-auto items-center justify-center gap-0 h-[218px] w-[211px] max-[1199px]:w-[270px] overflow-visible relative max-[809px]:w-full max-[809px]:h-auto max-[809px]:min-h-[218px]">
    <div className={`relative ${className || "w-[190px] h-[120px]"}`}>
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden z-[2] flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={label}
          width={width}
          height={height}
          className="h-full w-full object-contain object-center block"
        />
      </div>
    </div>
    <CardBorder />
    <p className="font-bangers text-white text-[24px] tracking-[0.02em] text-center relative z-[2] h-[54px] w-full whitespace-pre-wrap break-words flex items-center justify-center">
      {label}
    </p>
  </div>
);

export default function WhatIs() {
  return (
    <section
      id="whatis"
      className="flex overflow-hidden flex-col items-center justify-center gap-16 w-full py-60 px-0 max-[1199px]:py-20 max-[809px]:px-4"
    >
      <div className="flex flex-col items-center justify-start gap-8 w-full max-w-[576px] overflow-visible">
        <AppearAnimation delay={0} duration={0.4} bounce={0.2} direction="up">
          <h2 className="font-bangers text-[rgb(255,219,161)] text-[48px] tracking-[0.02em] text-center max-[809px]:text-[36px] w-full">
            WHAT IS DOPERAIDER?
          </h2>
        </AppearAnimation>

        <AppearAnimation delay={0.1} duration={0.4} bounce={0.2} direction="up">
          <div className="flex flex-col items-center gap-0 max-w-[571px] w-full">
            <p className="font-roboto text-[#ADADAD] text-[20px] leading-[22px] tracking-[0.02em] text-center max-[809px]:text-[16px]">
              DopeRaider is a realtime on-chain multiplayer RPG strategy game where players produce, trade and raid dope, to generate real income in a decentralised economy. Buy and sell across dangerous districts, and build your empire from the ground up.
            </p>

            <p className="font-roboto text-[#ADADAD] text-[18px] leading-[22px] tracking-[0.02em] text-center max-[809px]:text-[16px]">
              <br />
            </p>

            <p className="font-roboto text-[#ADADAD] text-[20px] leading-[22px] tracking-[0.02em] text-center max-[809px]:text-[16px]">
              Raid rival players, steal their stash, and climb the leaderboard to become the most feared dealer on the streets.
            </p>

            <p className="font-roboto text-[#ADADAD] text-[18px] leading-[22px] tracking-[0.02em] text-center max-[809px]:text-[16px]">
              <br />
            </p>

            <p className="font-roboto text-white text-[20px] leading-[22px] tracking-[0.02em] text-center font-bold max-[809px]:text-[16px]">
              Respect has a price.
            </p>
          </div>
        </AppearAnimation>
      </div>

      <div className="grid grid-cols-4 w-fit items-center justify-start gap-4 min-[810px]:gap-10 mx-auto overflow-visible max-[1199px]:grid-cols-2">
        <AppearAnimation delay={0.2} duration={0.4} bounce={0.2} direction="up">
          <Card
            imageSrc="/images/earn-respect.png"
            label="Earn respect"
            width={150}
            height={120}
          />
        </AppearAnimation>
        <AppearAnimation delay={0.3} duration={0.4} bounce={0.2} direction="up">
          <Card
            imageSrc="/images/increase-supply.png"
            label="INCREASE YOUR SUPPLY"
            width={190}
            height={120}
          />
        </AppearAnimation>
        <AppearAnimation delay={0.4} duration={0.4} bounce={0.2} direction="up">
          <Card
            imageSrc="/images/travel-districts.png"
            label="TRAVEL ACROSS DISTRICTS"
            width={150}
            height={130}
            className="h-[130px] w-[150px]"
          />
        </AppearAnimation>
        <AppearAnimation delay={0.5} duration={0.4} bounce={0.2} direction="up">
          <Card
            imageSrc="/images/raid-rivals.png"
            label="RAID OTHER RIVAL PLAYERS"
            width={180}
            height={120}
          />
        </AppearAnimation>
      </div>
    </section>
  );
}