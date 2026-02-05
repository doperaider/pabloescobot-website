"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import AppearAnimation from "./AppearAnimation";

const Counter = ({ from, to, duration = 2, prefix = "", delay = 0 }: { from: number, to: number, duration?: number, prefix?: string, delay?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration,
        delay,
        onUpdate(value) {
          if (node) {
            node.textContent = prefix + value.toFixed(prefix.includes('$') ? 2 : 0);
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, prefix, delay]);

  return (
    <div ref={ref} className="inline-block relative">
      <span ref={nodeRef} className="font-roboto font-bold text-white text-[inherit] tracking-[-0.03em] whitespace-nowrap">
        {prefix}{from.toFixed(prefix.includes('$') ? 2 : 0)}
      </span>
    </div>
  );
};


const AnimatedVideoPhone = ({
  videoSrc,
  delay = 0.3
}: {
  videoSrc: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        videoRef.current?.play().catch((err) => console.log("Video play blocked", err));
      }, (delay + 0.2) * 1000);
      return () => clearTimeout(timer);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isInView, delay]);

  return (
    <div className="w-[337px] mx-auto max-w-[80%] aspect-[0.46/1] pt-8 relative flex items-center justify-center">
      <motion.div
        ref={ref}
        className="relative w-full z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.8,
          delay: isInView ? delay : 0,
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full rounded-xl object-cover shadow-2xl"
          style={{ backgroundColor: "black" }}
        />
      </motion.div>
    </div>
  );
};

const AnimatedCharacterImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="absolute inset-[-20%] w-[140%] h-[140%]"
    >
      <motion.div
        style={{ y }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

const PlayToEarn = () => (
  <div className="flex w-full flex-row flex-wrap items-center justify-center gap-5 h-min overflow-visible relative max-[809px]:flex-col">

    <div className="relative flex-1 aspect-[0.898/1] bg-[#2c2c2c] rounded-2xl overflow-hidden max-[809px]:w-full max-[809px]:aspect-auto max-[809px]:h-[500px]">
      <AnimatedCharacterImage
        src="/images/feature1-bg.jpg"
        alt="Play to Earn"
      />

      <AnimatedVideoPhone videoSrc="/videos/feature1.mp4" delay={0.3} />
    </div>

    <div className="flex flex-1 flex-col items-start justify-center gap-6 max-[809px]:w-full max-[809px]:items-center">
      <div className="min-[809px]:w-[470px] mx-auto flex flex-col  items-start justify-start gap-4 w-full max-[809px]:items-center">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <p className="font-bangers text-[rgb(255,219,161)] text-[32px] tracking-[0.02em]">
            PLAY TO EARN
          </p>
          <h3 className="font-roboto font-black text-white text-[48px] leading-[44px] tracking-[-0.05em] max-[809px]:text-[36px] max-[809px]:leading-[38px]">
            TIME THE MARKETS, BUYING AND SELLING YOUR SUPPLY
          </h3>
        </div>
        <p className="font-roboto text-[#ADADAD] text-[18px] leading-[22px] tracking-[0.02em]">
          Buy low, sell high. Produce weed and coke, move product across districts. Watch the market for the best deals. Every smart trade boosts your profit, respect, and empire.
        </p>
      </div>



      <div className="flex min-[809px]:w-[470px] mx-auto flex-col min-[1200px]:flex-row items-center justify-center gap-[10px] w-full min-[1200px]:w-[83%] relative overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-[6px] w-[min-content]">

          <div className="relative w-full border-[1.5px] border-black rounded-[6px] bg-gradient-to-b from-[#666] to-[#444] shadow-[0_6px_6px_rgba(0,0,0,0.25)] flex flex-row items-center justify-center gap-[6px] py-[8px] pr-[12px] pl-[6px] overflow-hidden">
            <div className="w-[38px] h-[38px] relative flex-none">
              <Image src="/images/stats-cash-icon.png" alt="Cash" fill className="object-cover rounded-[inherit]" />
            </div>
            <div className="font-roboto font-bold text-white text-[37px] tracking-[-0.03em] whitespace-nowrap min-w-max">
              <Counter from={0} to={120.64} prefix="$" duration={2} />
            </div>
          </div>

          <div className="flex flex-row items-center justify-start gap-[6px] w-[min-content]">

            <div className="border-[1.5px] border-black rounded-[6px] bg-gradient-to-b from-[#090927] to-[#49497e] flex flex-row items-center justify-start gap-[6px] h-[50px] px-[12px] py-[6px] w-[min-content] overflow-hidden relative">
              <div className="w-[18px] h-[23px] relative flex-none">
                <svg width="100%" height="100%" viewBox="0 0 18 23" fill="none">
                  <path d="M10.9534 15.1824C11.3256 14.7812 11.369 14.2369 11.3838 13.7285C11.4202 12.452 11.1442 11.2719 10.1926 10.3746C9.66686 9.8793 9.13487 9.3914 8.58583 8.88226C8.75721 8.66242 8.97978 8.38374 9.19536 8.09852C9.69788 7.43246 9.86228 6.66179 9.76147 5.83719C9.69865 5.32559 9.41793 4.93658 8.97125 4.69876C8.77737 4.59579 8.58195 4.49772 8.33535 4.37023C8.77117 3.53418 9.16279 2.69569 9.64282 1.91766C9.78783 1.68311 10.1725 1.52212 10.4594 1.50087C10.7867 1.47717 11.1496 1.59403 11.4567 1.74359C12.0538 2.03453 12.2198 2.53632 11.9313 3.1558C11.3582 4.38576 10.7642 5.60427 10.1632 6.81952C9.8491 7.45371 9.68624 8.09034 9.84289 8.81361C10.0934 9.97737 11.1876 10.69 12.2841 10.3631C12.4315 10.319 12.5749 10.261 12.7471 10.1997C12.7835 10.2904 12.8215 10.3696 12.8471 10.453C13.3085 11.9486 14.9898 12.3359 15.9902 11.1755C16.5074 10.5756 16.7734 9.55894 16.6276 8.68857C16.4322 9.04489 16.2647 9.38813 16.0631 9.70768C15.8645 10.0231 15.6513 10.3345 15.4093 10.614C15.0045 11.0815 14.7052 11.1321 14.2097 10.8796C13.7847 10.663 13.5195 10.1751 13.59 9.67581C13.6234 9.43799 13.6901 9.19526 13.7917 8.98114C14.3578 7.79286 14.9371 6.61276 15.5164 5.43102C15.8963 4.65545 16.1662 4.58189 16.9021 4.97091C17.59 5.33458 17.9188 5.92545 17.9149 6.70592C17.9048 8.71799 17.9452 10.7358 17.818 12.7405C17.7079 14.482 16.906 15.9719 15.8289 17.2819C15.6652 17.4805 15.5761 17.6579 15.5908 17.9251C15.6559 19.1199 15.7032 20.3164 15.7575 21.512C15.7816 22.0375 15.5606 22.3129 15.0619 22.3137C11.9607 22.3203 8.8588 22.3203 5.75763 22.3146C5.26752 22.3137 5.01471 22.0383 5.05504 21.5112C5.12096 20.6588 5.22797 19.8105 5.3187 18.9598C5.35438 18.6222 5.39548 18.2855 5.42882 17.9472C5.47613 17.4724 5.37997 17.0564 5.10467 16.6494C3.86157 14.813 2.66732 12.9407 1.41025 11.1158C0.689826 10.0697 0.768926 9.0359 1.29626 7.98492C1.82591 6.92985 2.39667 5.89603 2.97053 4.8663C3.43582 4.03107 3.87087 3.82757 4.74717 4.09318C5.98019 4.46748 7.20081 4.88755 8.42143 5.30679C8.91231 5.47515 9.11394 5.94425 8.98288 6.57353C8.84949 7.21344 8.54938 7.76263 8.08719 8.20476C7.76149 8.51613 7.34505 8.49733 6.98678 8.37801C6.46642 8.20557 5.98175 7.91627 5.47535 7.69316C5.32491 7.62696 5.15275 7.61716 4.99067 7.5812C4.99533 7.74219 4.96198 7.91954 5.01316 8.06174C5.1194 8.35513 5.09614 8.5905 4.85031 8.7801C4.70529 8.89206 4.54244 8.98196 4.41216 9.10945C4.30437 9.21569 4.23225 9.36198 4.14462 9.49111C4.30902 9.53769 4.49902 9.66273 4.63317 9.61451C4.95888 9.49765 5.27683 9.32847 5.56453 9.12825C5.85301 8.92802 6.10272 8.90841 6.42145 9.05224C7.04494 9.3342 7.74132 9.4764 8.31053 9.84416C9.58388 10.6663 10.6246 11.7385 10.8293 13.4082C10.8999 13.9819 10.8402 14.5728 10.8402 15.1555C10.8789 15.1644 10.9169 15.1734 10.9557 15.1824H10.9534Z" fill="url(#res-g1)" />
                  <path d="M10.5325 8.18844C10.6504 7.83457 10.7357 7.46354 10.8923 7.1301C11.4639 5.91649 12.0532 4.71268 12.6488 3.51214C12.9388 2.92781 13.211 2.81421 13.8276 2.97766C14.0385 3.03405 14.2533 3.09534 14.4495 3.1926C15.0683 3.49825 15.2847 4.11936 14.9815 4.74537C14.3394 6.07258 13.6787 7.3908 13.0366 8.71801C12.7458 9.31869 12.2533 9.58185 11.6593 9.60064C11.0273 9.62026 10.5969 9.01958 10.5317 8.18844H10.5325Z" fill="url(#res-g2)" />
                  <path d="M5.17731 3.33556C5.67594 2.55182 6.09471 1.80404 6.59877 1.12654C7.07415 0.486632 8.10477 0.489083 8.6259 1.10284C8.74532 1.2434 8.78099 1.5842 8.70655 1.76563C8.40721 2.49625 8.05359 3.20153 7.71005 3.9109C7.67825 3.97628 7.56193 4.05556 7.50842 4.04003C6.74767 3.82019 5.99157 3.58482 5.17808 3.33556H5.17731Z" fill="url(#res-g3)" />
                  <defs>
                    <linearGradient id="res-g1" x1="9.40011" y1="1.4978" x2="9.40011" y2="22.3187" gradientUnits="userSpaceOnUse"><stop stopColor="#9EBEFF" /><stop offset="1" stopColor="#356FB2" /></linearGradient>
                    <linearGradient id="res-g2" x1="12.8245" y1="2.90967" x2="12.8245" y2="9.60111" gradientUnits="userSpaceOnUse"><stop stopColor="#9EBEFF" /><stop offset="1" stopColor="#356FB2" /></linearGradient>
                    <linearGradient id="res-g3" x1="6.96134" y1="0.644531" x2="6.96134" y2="4.042" gradientUnits="userSpaceOnUse"><stop stopColor="#9EBEFF" /><stop offset="1" stopColor="#356FB2" /></linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="font-roboto font-bold text-white text-[24px] tracking-[-0.03em] min-w-max">
                <Counter from={0} to={100} duration={2} />
              </div>
            </div>

            <div className="border-[1.5px] border-black rounded-[6px] bg-gradient-to-b from-[#000] to-[#8891a4] flex flex-row items-center justify-start gap-[6px] h-[50px] px-[12px] py-[6px] w-[min-content] overflow-hidden relative">
              <div className="w-[21px] h-[25px] relative flex-none">
                <svg width="100%" height="100%" viewBox="0 0 21 25" fill="none">
                  <path d="M17.0729 7.40885C17.6987 7.0096 18.2367 6.65063 18.7894 6.31792C19.4249 5.93531 20.0037 6.19535 20.1708 6.91767C20.2526 7.27227 20.1404 7.54018 19.8348 7.73631C19.2151 8.13468 18.5979 8.53831 17.9242 8.9752C18.3655 9.18096 18.7502 9.3622 19.1367 9.54081C19.76 9.82886 19.9802 10.2281 19.7896 10.728C19.5937 11.242 19.0714 11.4285 18.443 11.1956C17.6718 10.9102 16.9066 10.6072 16.1328 10.3288C15.9988 10.2806 15.8012 10.2623 15.6889 10.327C14.4981 11.0152 13.3186 11.7235 12.1374 12.4275C12.1157 12.4406 12.1044 12.4721 12.0661 12.5255C12.4395 12.7436 12.8138 12.9537 13.1811 13.1769C13.9741 13.6576 14.7662 14.1383 15.5513 14.6321C15.7933 14.7845 16.0014 14.809 16.2738 14.6846C17.0233 14.3432 17.7823 14.0227 18.55 13.7259C18.7955 13.6314 19.135 13.528 19.3326 13.6279C19.5937 13.7592 19.8418 14.056 19.9393 14.337C20.0551 14.6689 19.8644 14.9972 19.5354 15.1706C19.0253 15.4394 18.5039 15.688 17.9251 15.9761C18.5553 16.3674 19.1454 16.7177 19.7182 17.095C20.2814 17.4662 20.3197 18.1465 19.8218 18.5738C19.5145 18.8365 19.1776 18.8216 18.8521 18.6377C18.4238 18.3961 18.0121 18.1238 17.5917 17.8673C17.4472 17.7788 17.2975 17.6991 17.099 17.5871C17.099 18.1921 17.1051 18.7393 17.0973 19.2865C17.0903 19.8197 16.8413 20.106 16.3748 20.141C15.9134 20.1761 15.5122 19.8775 15.4425 19.4117C15.3137 18.5484 15.2162 17.6808 15.0778 16.8192C15.0465 16.6249 14.949 16.3736 14.7993 16.2781C13.6155 15.5225 12.4116 14.7976 11.213 14.0648C11.1791 14.0437 11.1338 14.0411 11.0267 14.0096C11.0267 14.2731 11.0276 14.5122 11.0267 14.7521C11.0215 15.8605 11.0337 16.9698 11.0024 18.0774C10.9919 18.4582 11.1294 18.699 11.4106 18.9258C12.0896 19.4721 12.7572 20.0316 13.4144 20.6033C13.8522 20.9842 13.9149 21.4491 13.6172 21.83C13.303 22.2318 12.8294 22.2677 12.3498 21.9202C11.9311 21.6163 11.5151 21.3081 10.998 20.929C10.998 21.7573 11.0067 22.4761 10.9954 23.1949C10.9858 23.7535 10.6899 24.0714 10.1963 24.0915C9.62095 24.1151 9.2632 23.7851 9.25711 23.2028C9.24927 22.4884 9.25536 21.7739 9.25536 20.9378C8.75921 21.3134 8.33182 21.6382 7.90268 21.9604C7.57887 22.2047 7.24027 22.2389 6.89818 22.0051C6.57263 21.7827 6.44642 21.4649 6.56828 21.0928C6.62312 20.9247 6.75195 20.7627 6.88774 20.6436C7.54319 20.0701 8.22127 19.5212 8.8715 18.9415C9.03427 18.7971 9.22925 18.5747 9.2336 18.3847C9.26407 16.9742 9.25014 15.5637 9.25014 14.0718C8.89587 14.281 8.60427 14.4579 8.30918 14.6277C7.39347 15.1566 6.46731 15.667 5.56813 16.2221C5.38099 16.3377 5.21125 16.5986 5.17034 16.8175C5.01975 17.6309 4.93183 18.4565 4.8091 19.276C4.74556 19.6963 4.53229 20.0158 4.10055 20.1209C3.75498 20.205 3.45555 20.085 3.27972 19.7768C3.19267 19.6245 3.16743 19.4222 3.1622 19.2401C3.14741 18.706 3.15698 18.1711 3.15698 17.5521C2.5642 17.9338 2.02104 18.2788 1.4831 18.6307C1.13666 18.8566 0.797188 18.8304 0.470768 18.6071C0.153924 18.39 -0.0123324 18.0677 0.112142 17.7009C0.188742 17.4741 0.362832 17.2369 0.559554 17.1038C1.11925 16.7238 1.7129 16.3937 2.37532 15.9945C1.79385 15.6898 1.26027 15.4674 0.797187 15.1434C0.572611 14.9867 0.384594 14.6522 0.349775 14.3764C0.306253 14.0289 0.560425 13.7303 0.912957 13.641C1.11838 13.5893 1.3743 13.6156 1.57537 13.6935C2.39708 14.0105 3.20312 14.3694 4.02308 14.6916C4.17976 14.7529 4.4174 14.788 4.54622 14.7118C5.69522 14.0376 6.82768 13.3363 7.96449 12.6402C8.02281 12.6043 8.06981 12.5492 8.17688 12.4546C6.97217 11.7428 5.81534 11.0319 4.62543 10.3813C4.41652 10.2675 4.05093 10.3559 3.78893 10.4452C3.09257 10.6825 2.41623 10.9776 1.7277 11.2385C1.34905 11.3821 0.992169 11.3506 0.684899 11.0494C0.218337 10.5906 0.302771 9.93831 0.882492 9.63624C1.12535 9.50929 1.38213 9.40948 1.63456 9.30091C1.8722 9.19847 2.11244 9.10041 2.41797 8.97258C1.85305 8.62499 1.33774 8.30804 0.822431 7.99109C0.10779 7.55157 -0.0784867 7.09453 0.249674 6.58847C0.567388 6.09816 1.08792 6.07627 1.766 6.51317C2.19252 6.78722 2.62688 7.049 3.05949 7.31342C3.09257 7.33356 3.1387 7.33093 3.15959 7.33531C3.15959 6.81085 3.15959 6.29341 3.15959 5.77596C3.15959 5.23837 3.40158 4.91968 3.8429 4.87853C4.34428 4.83125 4.73859 5.13944 4.81432 5.66301C4.9388 6.5263 5.0389 7.39309 5.17382 8.25551C5.20254 8.43937 5.29133 8.68015 5.43147 8.76858C6.60571 9.51191 7.79823 10.2264 8.9864 10.9469C9.03253 10.975 9.09085 10.982 9.18573 11.0126C9.20749 10.855 9.24405 10.7158 9.24405 10.5757C9.25014 9.34994 9.2397 8.12505 9.25623 6.89929C9.26146 6.52718 9.12044 6.28115 8.83581 6.05176C8.16904 5.51417 7.52491 4.94769 6.87903 4.38559C6.50213 4.05726 6.46122 3.53894 6.76848 3.17296C7.0479 2.83938 7.51707 2.79297 7.8992 3.0679C8.31702 3.36908 8.72874 3.67728 9.25275 4.06252C9.25275 3.24125 9.2484 2.55132 9.25449 1.86139C9.25972 1.28616 9.52346 0.935942 9.97871 0.879907C10.5732 0.806361 10.9928 1.16271 11.0032 1.77909C11.0154 2.5198 11.0058 3.26052 11.0058 4.13606C11.4741 3.77271 11.8641 3.46715 12.2558 3.16508C12.7024 2.82099 13.0575 2.79385 13.3935 3.07403C13.8261 3.43475 13.854 3.96008 13.4266 4.35758C12.7346 5.00023 12.0173 5.61486 11.3244 6.25751C11.1982 6.37483 11.0659 6.5657 11.0642 6.72418C11.0476 8.0804 11.0607 9.43662 11.0668 10.7928C11.0668 10.834 11.0877 10.8751 11.1112 10.9671C11.334 10.8366 11.5429 10.7167 11.7492 10.5932C12.7319 10.0066 13.7217 9.43136 14.6879 8.81936C14.8672 8.70641 15.0265 8.45951 15.0691 8.2485C15.2449 7.37996 15.3659 6.50091 15.52 5.62799C15.6131 5.10091 15.9639 4.8435 16.4731 4.90217C16.9336 4.9547 17.1556 5.24801 17.1382 5.8031C17.1225 6.30654 17.0955 6.81086 17.0694 7.40885H17.0729Z" fill="url(#coke-grad)" />
                  <defs><linearGradient id="coke-grad" x1="10.1337" y1="0.870361" x2="10.1337" y2="24.0927" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#9BC3D7" /></linearGradient></defs>
                </svg>
              </div>
              <div className="font-roboto font-bold text-white text-[24px] tracking-[-0.03em] min-w-max">
                <Counter from={0} to={20} duration={2} />
              </div>
            </div>

            <div className="border-[1.5px] border-black rounded-[6px] bg-gradient-to-b from-[#10331c] to-[#318951] flex flex-row items-center justify-start gap-[6px] h-[50px] px-[12px] py-[6px] w-[min-content] overflow-hidden relative">
              <div className="w-[23px] h-[25px] relative flex-none">
                <svg width="100%" height="100%" viewBox="0 0 23 25" fill="none">
                  <path d="M14.7893 15.8062C15.9733 15.3132 17.1295 15.0224 18.3142 14.8433C19.3912 14.6805 20.4753 14.6192 21.56 14.7602C21.7293 14.782 21.9695 14.9005 22.0167 15.0299C22.0625 15.1566 21.9459 15.3983 21.8251 15.5141C20.4996 16.7848 18.8714 17.5101 17.099 17.933C16.3071 18.1223 15.4896 18.2061 14.706 18.3341C15.5708 18.6065 16.4077 19.0246 17.1635 19.5851C17.4938 19.8303 17.8131 20.0972 18.0962 20.3921C18.2087 20.5092 18.269 20.7408 18.2378 20.8981C18.2219 20.9812 17.9588 21.0683 17.8068 21.0683C15.7262 21.0724 13.867 20.4418 12.2437 19.1574C12.1639 19.0941 12.0827 19.0321 11.9508 18.93V24.0811L10.3713 24.0927V18.9674C9.14219 20.0509 7.68687 20.6631 6.09066 20.9614C5.60694 21.052 5.10378 21.0588 4.60896 21.0656C4.45142 21.0677 4.18076 20.971 4.15855 20.8749C4.12316 20.7258 4.20297 20.4745 4.32581 20.3771C4.97817 19.8596 5.64025 19.3481 6.33772 18.8919C6.73122 18.6344 7.19968 18.486 7.62441 18.2939C6.13785 18.1782 4.67836 17.8554 3.28757 17.2588C2.3937 16.8754 1.56297 16.3912 0.834964 15.747C0.714901 15.6408 0.592063 15.5352 0.487962 15.4147C0.247837 15.1348 0.332506 14.8406 0.701022 14.7956C1.24928 14.7282 1.80657 14.6771 2.35692 14.6982C3.9094 14.7589 5.42303 15.049 6.88876 15.5618C7.11293 15.6401 7.33293 15.7327 7.57722 15.7885C7.16081 15.4501 6.73747 15.1198 6.33009 14.7718C3.91634 12.707 2.25906 10.1703 1.40474 7.1364C1.37074 7.01654 1.32146 6.89396 1.32493 6.77342C1.32979 6.61611 1.32771 6.39683 1.42417 6.32055C1.52134 6.2436 1.7684 6.25177 1.89263 6.32055C2.60329 6.71826 3.32644 7.10439 3.9906 7.56951C6.33703 9.21073 8.15671 11.3082 9.48156 13.8197C9.53292 13.9171 9.59052 14.0111 9.67935 14.0935C9.56276 13.497 9.43992 12.9011 9.32958 12.3038C9.00548 10.5516 8.96592 8.79395 9.17967 7.02335C9.41216 5.10224 9.89935 3.2506 10.651 1.46501C10.7571 1.21304 10.8182 0.861643 11.1798 0.870496C11.5351 0.878668 11.5858 1.22734 11.6934 1.48204C12.7975 4.08755 13.3527 6.79998 13.2819 9.62273C13.2445 11.1203 12.9918 12.5939 12.6275 14.0486C12.6143 14.1003 12.6067 14.1541 12.5893 14.242C12.9766 13.5834 13.3201 12.946 13.7136 12.3393C15.3077 9.87879 17.4161 7.94951 20.0172 6.54052C20.2185 6.43156 20.4267 6.32941 20.6432 6.25518C20.9035 6.16529 21.0929 6.2974 21.0659 6.5698C21.0367 6.85923 20.9652 7.14797 20.8806 7.42786C19.9242 10.6068 18.056 13.1742 15.4333 15.2335C15.2439 15.382 15.0558 15.5325 14.8677 15.683C14.8511 15.6966 14.8434 15.7211 14.7893 15.8062Z"></path>
                  <defs>
                    <linearGradient id="weed-grad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse"><stop stopColor="#00FF4F" /><stop offset="1" stopColor="#00C43D" /></linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="font-roboto font-bold text-white text-[24px] tracking-[-0.03em] min-w-max">
                <Counter from={0} to={50} duration={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[202px] aspect-[1.64/1] relative overflow-hidden flex-none hidden min-[1200px]:block">
          <Image src="/images/stats-bg-decoration.png" alt="" fill className="object-cover rounded-[inherit]" />
        </div>
      </div>
    </div>
  </div >
);

const RealWorldEconomies = () => (
  <div className="flex w-full flex-row flex-wrap items-center justify-center gap-5 h-min overflow-visible relative max-[809px]:flex-col-reverse">

    <div className="flex flex-1 flex-col items-start justify-center gap-6 max-[809px]:w-full max-[809px]:items-center">
      <div className="min-[809px]:w-[470px] mx-auto flex flex-col items-start justify-start gap-4 w-full max-[809px]:items-center">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <p className="font-bangers text-[rgb(255,219,161)] text-[32px] tracking-[0.02em]">
            REAL WORLD ECONOMIES
          </p>
          <h3 className="font-roboto font-black text-white text-[48px] leading-[44px] tracking-[-0.05em] max-[809px]:text-[36px] max-[809px]:leading-[38px]">
            BECOME A MASTER IN EACH DISTRICT
          </h3>
        </div>
        <p className="font-roboto text-[#ADADAD] text-[18px] leading-[22px] tracking-[0.02em]">
          There are 7 different districts, each with their own supply, demand, bosses and raiding challenges from other players. All players have a home district where it is safe for them to produce dope.
        </p>
      </div>

      <div className="relative w-[472px] h-[125px] overflow-visible max-[809px]:w-full mx-auto">
        <div className="absolute left-0 top-[15px] w-[477px] h-[130px] border border-white/[0.13] rounded-lg overflow-hidden max-[809px]:w-full">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-[-188px] w-full aspect-[1.5/1]">
            <div className="absolute inset-0 rounded-[inherit]">
              <img
                decoding="async"
                loading="lazy"
                width="1536"
                height="1024"
                sizes="(min-width: 1200px) 477px, (min-width: 810px) and (max-width: 1199px) 477px, (max-width: 809px) 477px"
                src="/images/jamaica-village.png"
                alt=""
                style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-6 w-[207px] h-[134px] overflow-visible">
          <div className="absolute left-[79px] top-[103px] w-[51px] h-[31px] bg-black/60 rounded-[100%]" />
          <div className="absolute left-[74px] top-[11px] w-[60px] h-[108px] flex text-black fill-black">
            <div className="w-full h-full aspect-[inherit]">

              <svg width="100%" height="100%" viewBox="-1 -1 60 108" fill="none" id="svg-569365079_3345">
                <g filter="url(#svg-569365079_3345_filter0_d_83_140)">
                  <mask id="svg-569365079_3345_path-1-outside-1_83_140" maskUnits="userSpaceOnUse" x="-2.3938" y="-3.177"
                    width="62" height="113" fill="black">
                    <rect fill="white" x="-2.3938" y="-3.177" width="62" height="113" />
                    <path
                      d="M57.3943 52.1335L29.8865 105.239L0.606201 52.1335L29.8865 0.822998L57.3943 52.1335ZM15.2615 52.6062L29.4294 77.7615L42.739 52.6062L29.4294 28.3005L15.2615 52.6062Z" />
                  </mask>
                  <path
                    d="M57.3943 52.1335L29.8865 105.239L0.606201 52.1335L29.8865 0.822998L57.3943 52.1335ZM15.2615 52.6062L29.4294 77.7615L42.739 52.6062L29.4294 28.3005L15.2615 52.6062Z"
                    fill="url(#svg-569365079_3345_paint0_linear_83_140)" />
                  <path
                    d="M57.3943 52.1335L59.0209 52.9761L59.4649 52.1189L59.0088 51.268L57.3943 52.1335ZM29.8865 105.239L28.2823 106.123L29.9369 109.124L31.5131 106.082L29.8865 105.239ZM0.606201 52.1335L-0.984832 51.2256L-1.49414 52.1181L-0.99798 53.018L0.606201 52.1335ZM29.8865 0.822998L31.501 -0.0425341L29.9365 -2.96072L28.2954 -0.0849222L29.8865 0.822998ZM15.2615 52.6062L13.6789 51.6837L13.1502 52.5906L13.6654 53.5052L15.2615 52.6062ZM29.4294 77.7615L27.8333 78.6604L29.4797 81.5835L31.0486 78.6182L29.4294 77.7615ZM42.739 52.6062L44.3582 53.4629L44.8194 52.5913L44.3457 51.7264L42.739 52.6062ZM29.4294 28.3005L31.0362 27.4207L29.4793 24.5775L27.8468 27.378L29.4294 28.3005ZM57.3943 52.1335L55.7677 51.291L28.2599 104.396L29.8865 105.239L31.5131 106.082L59.0209 52.9761L57.3943 52.1335ZM29.8865 105.239L31.4907 104.355L2.21038 51.2491L0.606201 52.1335L-0.99798 53.018L28.2823 106.123L29.8865 105.239ZM0.606201 52.1335L2.19723 53.0415L31.4775 1.73092L29.8865 0.822998L28.2954 -0.0849222L-0.984832 51.2256L0.606201 52.1335ZM29.8865 0.822998L28.272 1.68853L55.7798 52.9991L57.3943 52.1335L59.0088 51.268L31.501 -0.0425341L29.8865 0.822998ZM15.2615 52.6062L13.6654 53.5052L27.8333 78.6604L29.4294 77.7615L31.0256 76.8625L16.8576 51.7072L15.2615 52.6062ZM29.4294 77.7615L31.0486 78.6182L44.3582 53.4629L42.739 52.6062L41.1198 51.7495L27.8103 76.9048L29.4294 77.7615ZM42.739 52.6062L44.3457 51.7264L31.0362 27.4207L29.4294 28.3005L27.8227 29.1804L41.1323 53.486L42.739 52.6062ZM29.4294 28.3005L27.8468 27.378L13.6789 51.6837L15.2615 52.6062L16.8441 53.5287L31.0121 29.2231L29.4294 28.3005Z"
                    fill="#3D5C24" mask="url(#svg-569365079_3345_path-1-outside-1_83_140)" />
                </g>
                <defs>
                  <filter id="svg-569365079_3345_filter0_d_83_140" x="-8.82157" y="-2.96069" width="75.6139" height="126.74"
                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha" />
                    <feOffset dy="7.32743" />
                    <feGaussianBlur stdDeviation="3.66372" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_83_140" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_83_140" result="shape" />
                  </filter>
                  <linearGradient id="svg-569365079_3345_paint0_linear_83_140" x1="-68.8329" y1="72.6084" x2="128.622"
                    y2="72.6084" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#009245" />
                    <stop offset="0.47" stop-color="#C9FF94" />
                    <stop offset="1" stop-color="#009245" />
                  </linearGradient>
                </defs>
              </svg>


            </div>
          </div>

          <div className="absolute bottom-[66px] w-[69px] left-[calc(49.1150303128595%-69px/2)] top-0 flex text-black fill-black">
            <div className="w-full h-full aspect-[inherit]">
              <svg width="100%" height="100%" fill="none" id="svg1734494533_1102">
                <path
                  d="M3.10681 39.6926C2.85883 39.3806 3.92966 37.2178 3.45624 35.8453C2.35159 32.6218 -2.86732 24.1161 3.06171 23.1387L3.06171 22.1301C2.71229 21.9325 0.773521 22.5356 0.762249 21.5373C0.739706 19.6137 4.72996 5.73213 5.91351 4.45315C7.22105 3.039 9.63326 3.17422 11.3128 2.35276C11.9553 2.04082 12.0342 0.699421 12.3611 0.564245C14.4914 -0.298804 36.8099 0.013132 40.8227 0.293883C43.9224 0.501847 64.9897 3.71493 65.9365 4.69236C68.4051 9.17397 66.7256 13.7075 66.827 18.1164C66.8608 19.7593 68.112 21.4854 68.0556 23.4922C67.9655 26.4765 65.046 39.8902 62.7917 41.3147C61.1572 42.3441 48.0029 43.9142 45.3653 43.9558C35.7052 44.091 22.9003 42.6457 13.5446 41.0756C11.3804 40.7116 4.09873 40.93 3.12934 39.703L3.10681 39.6926Z"
                  fill="url(#svg1734494533_1102_paint0_linear_83_144)" />
                <defs>
                  <linearGradient id="svg1734494533_1102_paint0_linear_83_144" x1="68.0575" y1="21.9823" x2="0.278731"
                    y2="21.9823" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#303030" />
                    <stop offset="1" stop-color="#1B1B1B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="absolute left-[-1px] right-0 top-[34px] h-[47px] flex text-black fill-black">
            <div className="w-full h-full aspect-[inherit]">
              <svg width="208" height="45" viewBox="0 0 208 45" fill="none" id="svg-1635311327_1096">
                <path
                  d="M9.13711 40.4978C8.37976 40.1858 11.6501 38.023 10.2043 36.6504C6.83063 33.427 -9.1082 24.9213 8.99938 23.9439L8.99938 22.9352C7.93221 22.7377 2.01112 23.3407 1.97669 22.3425C1.90784 20.4189 14.0943 6.5373 17.7089 5.25832C21.7022 3.84417 29.0692 3.97939 34.1986 3.15793C36.1608 2.84599 36.4017 1.50459 37.4001 1.36942C43.9064 0.506367 112.068 0.818305 124.323 1.09906C133.79 1.30702 198.131 4.5201 201.022 5.49753C208.562 9.97915 203.432 14.5127 203.742 18.9216C203.845 20.5645 207.666 22.2905 207.494 24.2974C207.219 27.2817 198.303 40.6953 191.418 42.1199C186.426 43.1493 146.252 44.7194 138.197 44.761C108.694 44.8962 69.5875 43.4509 41.0147 41.8807C34.4051 41.5168 12.1665 41.7352 9.20593 40.5082L9.13711 40.4978Z"
                  fill="url(#svg-1635311327_1096_paint0_linear_83_143)" />
                <defs>
                  <linearGradient id="svg-1635311327_1096_paint0_linear_83_143" x1="207.5" y1="22.7875" x2="0.499999" y2="22.7875"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#303030" />
                    <stop offset="1" stop-color="#1B1B1B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="absolute left-[18px] top-[40px] whitespace-nowrap flex flex-col justify-start">
            <p className="font-bangers text-[29.31px] tracking-[0.02em] text-center text-white">JAMAICA VILLAGE</p>
          </div>
          <div className="absolute left-[84px] top-[3px] w-[38px] h-[38px] flex text-black fill-black">
            <div className="w-full h-full aspect-[inherit]">

              <svg width="100%" height="100%" viewBox="0 0 38 38" fill="none" id="svg-183041918_1210">
                <g clip-path="url(#svg-183041918_1210_clip0_83_146)">
                  <path
                    d="M36.7709 6.98047L1.39718 6.98047C1.04834 6.98047 0.765472 7.26326 0.765472 7.6121L0.765472 30.3524C0.765472 30.7012 1.04834 30.9841 1.39718 30.9841H36.7709C37.1198 30.9841 37.4026 30.7012 37.4026 30.3524V7.6121C37.4026 7.26326 37.1197 6.98047 36.7709 6.98047Z"
                    fill="#73AF00" />
                  <path
                    d="M37.4026 7.61217C37.4026 7.26333 37.1197 6.98047 36.7709 6.98047H33.9443L19.084 16.7166L4.22374 6.98054H1.39718C1.04834 6.98054 0.765472 7.26333 0.765472 7.61217L0.765472 9.24624L15.6258 18.9823L0.765472 28.7184L0.765472 30.3525C0.765472 30.7013 1.04834 30.9842 1.39718 30.9842H4.22374L19.084 21.248L33.9443 30.9841H36.7709C37.1197 30.9841 37.4026 30.7013 37.4026 30.3524V28.7184L22.5423 18.9823L37.4026 9.24624V7.61217Z"
                    fill="#FFE15A" />
                  <path d="M37.4026 9.24609V28.7183L22.5423 18.9822L37.4026 9.24609Z" fill="#464655" />
                  <path d="M0.765472 28.7183L0.765472 9.24609L15.6258 18.9822L0.765472 28.7183Z" fill="#464655" />
                </g>
                <defs>
                  <clipPath id="svg-183041918_1210_clip0_83_146">
                    <rect width="36.6372" height="36.6372" fill="white" transform="translate(0.765503 0.663574)" />
                  </clipPath>
                </defs>
              </svg>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="relative flex-1 aspect-[0.898/1] bg-[#2c2c2c] rounded-2xl overflow-hidden max-[809px]:w-full max-[809px]:aspect-auto max-[809px]:h-[500px]">
      <AnimatedCharacterImage
        src="/images/feature2-character.png"
        alt="Real World Economies"
      />

      <AnimatedVideoPhone videoSrc="/videos/feature2.mp4" delay={0.3} />
    </div>
  </div>
);

const RankUpRespect = () => (
  <div className="flex w-full flex-row flex-wrap items-center justify-center gap-5 h-min overflow-visible relative max-[809px]:flex-col">

    <div className="relative flex-1 aspect-[0.898/1] bg-[#2c2c2c] rounded-2xl overflow-hidden max-[809px]:w-full max-[809px]:aspect-auto max-[809px]:h-[500px]">
      <AnimatedCharacterImage
        src="/images/feature3-character.png"
        alt="Rank Up"
      />

      <AnimatedVideoPhone videoSrc="/videos/feature3.mp4" delay={0.3} />
    </div>

    <div className="flex flex-1 flex-col items-start justify-center gap-6 max-[809px]:w-full max-[809px]:items-center">
      <div className="min-[809px]:w-[470px] mx-auto flex flex-col items-start justify-start gap-4 w-full max-[809px]:items-center">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <p className="font-bangers text-[rgb(255,219,161)] text-[32px] tracking-[0.02em]">
            RANK UP YOUR RESPECT
          </p>
          <h3 className="font-roboto font-black text-white text-[48px] leading-[44px] tracking-[-0.05em] max-[809px]:text-[36px] max-[809px]:leading-[38px]">
            GATHER TROPHIES & EARN YOUR RESPECT
          </h3>
        </div>
        <p className="font-roboto text-[#ADADAD] text-[18px] leading-[22px] tracking-[0.02em]">
          Earn respect and collect trophies as you dominate deals, raid other players, and explore territory. Every action builds your reputation. Rise through the ranks to become the most feared name in the game.
        </p>
      </div>

      <div className="relative w-[472px] h-[125px] overflow-visible max-[809px]:w-full mx-auto max-[809px]:h-auto max-[809px]:flex max-[809px]:flex-col max-[809px]:gap-4 max-[809px]:items-center">
        <div className="absolute right-0 top-[11px] w-[176px] h-[172px] bg-black border border-[rgba(114,114,114,0.4)] rounded gap-1 overflow-hidden origin-center" style={{ transform: "rotate(8deg)" }}>
          <div className="absolute left-1/2 -translate-x-1/2 -top-[49px] w-[241px] h-[208px]" style={{ transform: "rotate(-8deg)" }}>
            <svg width="100%" height="100%" viewBox="0 0 241 208" fill="none">
              <g filter="url(#filter0_g_83_160)">
                <path d="M11.8976 162.144C11.2795 160.778 15.8858 152.52 15.1349 146.777C13.3942 133.292 1.45865 96.7057 20.8919 95.3484L21.4487 91.2796C20.4443 90.3303 13.9332 91.9176 14.4483 87.886C15.4384 80.1164 35.8168 25.8601 40.2944 21.2171C45.2417 16.0828 52.8539 17.6801 58.6594 15.0989C60.879 14.1207 61.8709 8.74414 62.9872 8.3414C70.2524 5.78901 141.201 16.78 153.834 19.6624C163.597 21.853 228.957 44.0012 231.434 48.3569C236.827 67.5116 228.972 85.067 226.862 102.896C226.063 109.538 229.097 117.046 227.809 125.117C225.875 137.116 209.167 189.952 201.197 194.715C195.42 198.155 152.635 198.752 144.207 197.77C113.349 194.102 73.3423 182.688 44.3957 172.275C37.7 169.863 14.3754 167.568 11.9636 162.196L11.8976 162.144Z" fill="url(#paint0_linear_83_160)" />
              </g>
              <defs>
                <filter id="filter0_g_83_160" x="6.9176" y="4.95996" width="229.374" height="196.235" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" seed="5034" />
                  <feDisplacementMap in="shape" scale="6" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                  <feMerge result="effect1_texture_83_160">
                    <feMergeNode in="displacedImage" />
                  </feMerge>
                </filter>
                <linearGradient id="paint0_linear_83_160" x1="228.649" y1="119.027" x2="12.6619" y2="89.47" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1A1714" />
                  <stop offset="0.471154" stopColor="#7C2E81" />
                  <stop offset="1" stopColor="#262626" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute left-[60px] top-[16px] w-[56px] h-[28px]" />

          <div className="absolute left-1/2 -translate-x-1/2 top-[146px] w-[145px] flex flex-col justify-start">
            <p className="font-roboto font-bold text-[12px] leading-[18px] text-center text-[#ADADAD]">Achieved on 28 May 2025</p>
          </div>

          <div className="absolute left-[16px] top-[32px] w-[145px] h-[74px] flex flex-col items-center justify-start gap-2">
            <div className="flex flex-col justify-start w-[145px]">
              <p className="font-bangers text-[24px] leading-[22px] text-center text-white">VICE</p>
            </div>
            <div className="flex flex-col justify-center w-[145px] h-[30px]">
              <p className="font-roboto text-[14px] leading-[15px] text-center text-[#F8F8F8]">Travel to Vice Island</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-[10px] w-[min-content] bg-gradient-to-b from-black to-[#666] border border-black rounded px-2 py-1" style={{ mixBlendMode: "luminosity" }}>
              <div className="flex flex-col justify-start">
                <p className="font-roboto font-medium text-[12px] text-center text-white uppercase">COMPLETED</p>
              </div>
            </div>
          </div>

          <div className="absolute left-[4px] top-[4px] w-[32px] h-[33px]">
            <svg width="100%" height="100%" viewBox="0 0 32 33" fill="none">
              <defs>
                <linearGradient id="paint0_linear_close1" x1="15.924" y1="30.39" x2="15.924" y2="2.38998" gradientUnits="userSpaceOnUse">
                  <stop stopColor="black" />
                  <stop offset="1" stopColor="#666666" />
                </linearGradient>
                <linearGradient id="paint1_linear_close1" x1="23.8901" y1="28.2457" x2="14.724" y2="1.82705" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9900" />
                  <stop offset="1" stopColor="#FFCE7E" />
                </linearGradient>
              </defs>
              <circle cx="15.924" cy="16.39" r="13.7083" transform="rotate(7.79233 15.924 16.39)" stroke="url(#paint0_linear_close1)" strokeWidth="0.583333" />
              <path d="M11.9781 9.42665C12.0304 9.28043 12.0246 9.15683 11.9336 9.03324C11.8274 8.88895 11.8024 8.7177 11.8206 8.53848C11.841 8.33787 11.86 8.13681 11.8719 7.93561C11.8795 7.80438 11.9284 7.76885 12.0612 7.78702C14.4024 8.11212 16.7445 8.43263 19.0865 8.75341C20.0358 8.88332 20.9854 9.01105 21.9349 9.14014C22.127 9.16644 22.1403 9.18353 22.1045 9.37897C22.069 9.57277 22.0216 9.76495 21.993 9.95971C21.9665 10.1395 21.8817 10.2829 21.745 10.3873C21.6258 10.4785 21.5895 10.5891 21.6064 10.7442C21.7346 10.7618 21.8676 10.78 22.0007 10.7982C22.5828 10.8781 23.1659 10.9532 23.7468 11.0397C24.1933 11.106 24.5051 11.4213 24.5739 11.8603C24.5865 11.9406 24.5973 12.026 24.585 12.1055C24.4407 13.0382 24.2094 13.9479 23.7372 14.7696C22.9929 16.0648 21.8803 16.8778 20.4617 17.2819C19.8452 17.4574 19.2255 17.4698 18.5985 17.4135C18.4579 17.4009 18.338 17.4242 18.2149 17.5018C17.8121 17.756 17.3593 17.8896 16.9113 18.0322C16.8783 18.0427 16.8417 18.0402 16.8165 18.0426C16.6481 18.3805 16.5373 18.726 16.5032 19.0956C16.4519 19.6526 16.6126 20.1645 16.83 20.6593C17.0058 21.0593 17.2478 21.4214 17.5956 21.6888C17.7108 21.7774 17.8685 21.8159 18.0122 21.8581C18.1194 21.8894 18.2358 21.8867 18.3473 21.9045C18.6538 21.9534 18.7993 22.1533 18.7615 22.4652C18.7279 22.7426 18.6989 23.0207 18.6637 23.2979C18.6291 23.5704 18.5897 23.8426 18.5516 24.1208C18.7463 24.1772 18.8517 24.2933 18.8704 24.4906C18.8886 24.6818 18.8044 24.8067 18.6135 24.8056C18.4383 24.8047 18.2632 24.776 18.089 24.7521C15.8363 24.4472 13.5836 24.1414 11.3308 23.8351C11.2636 23.8259 11.1948 23.8201 11.1308 23.7996C11.0196 23.7641 10.8809 23.7588 10.8852 23.5813C10.891 23.3467 10.987 23.1879 11.1628 23.1455C11.2056 23.1352 11.25 23.1324 11.333 23.1207C11.3923 22.6873 11.4507 22.2422 11.5153 21.7981C11.5384 21.6395 11.5696 21.4815 11.6097 21.3267C11.667 21.1056 11.7978 21.0307 12.0704 21.053C12.1514 21.0596 12.2326 21.0721 12.3114 21.0913C12.6025 21.1625 12.8618 21.0849 13.1102 20.9299C13.8157 20.4908 14.303 19.8709 14.5847 19.0873C14.7142 18.7271 14.7057 18.3531 14.6608 17.9746C14.6396 17.7955 14.5637 17.6979 14.4194 17.6118C14.0301 17.3793 13.6711 17.1054 13.3661 16.763C13.3396 16.733 13.2896 16.72 13.2482 16.7085C12.7056 16.5598 12.1484 16.4619 11.6433 16.1891C11.0671 15.8779 10.523 15.5201 10.0817 15.031C9.48167 14.3656 9.08408 13.5835 8.8595 12.7076C8.66702 11.9552 8.65886 11.1905 8.6907 10.4216C8.6985 10.2346 8.70639 10.0428 8.75209 9.86292C8.85409 9.46177 9.24297 9.04902 9.84638 9.13549C10.5131 9.23118 11.1808 9.3181 11.8483 9.40861C11.8924 9.41464 11.9362 9.42064 11.9781 9.42638L11.9781 9.42665ZM23.4513 12.1067C23.4406 12.1011 23.4296 12.091 23.4173 12.0893C22.7727 12.0014 22.1279 11.9154 21.4832 11.826C21.3975 11.8143 21.3748 11.854 21.3605 11.929C21.3007 12.2395 21.2351 12.5487 21.1738 12.8587C20.9366 14.058 20.4851 15.1659 19.7945 16.1728C19.7648 16.216 19.757 16.275 19.7349 16.3384C21.7589 16.0682 23.4025 14.1859 23.4512 12.107L23.4513 12.1067ZM9.8215 10.2357C9.45332 12.556 10.3515 14.3902 12.2103 15.2831C12.2132 15.204 12.2354 15.1292 12.2155 15.069C11.8194 13.8717 11.7174 12.6441 11.8419 11.3902C11.8704 11.1043 11.8824 10.8164 11.9023 10.5205L9.8215 10.2357Z" fill="url(#paint1_linear_close1)" />
            </svg>
          </div>
        </div>

        <div className="absolute left-[9px] top-[10px] w-[176px] h-[172px] bg-black/70 border border-[rgba(114,114,114,0.4)] rounded gap-1 overflow-hidden origin-center" style={{ transform: "rotate(-7deg)" }}>

          <div className="absolute left-1/2 -translate-x-1/2 -top-[47px] w-[238px] h-[204px]" style={{ transform: "rotate(7deg)" }}>
            <svg width="100%" height="100%" viewBox="0 0 238 204" fill="none">
              <g filter="url(#filter0_g_83_179)">
                <path d="M28.2631 185.15C27.3247 183.981 29.7332 174.837 27.5779 169.461C22.5391 156.832 1.88171 124.362 20.3673 118.216L19.895 114.136C18.686 113.467 12.7741 116.623 12.2706 112.59C11.2978 104.818 17.5463 47.199 20.7288 41.5884C24.2442 35.3853 32.0145 35.0398 36.9959 31.0962C38.9026 29.5969 38.5266 24.1425 39.5077 23.4748C45.9102 19.1962 117.364 12.2017 130.316 11.8528C140.317 11.5472 209.132 16.749 212.615 20.3519C222.6 37.5643 219.357 56.5214 221.746 74.3151C222.623 80.9473 227.429 87.4654 228.189 95.6029C229.298 107.706 226.252 163.037 219.716 169.632C214.976 174.4 173.683 185.616 165.275 186.76C134.475 190.881 92.8862 189.772 62.2595 186.883C55.1744 186.211 32.0117 189.788 28.34 185.184L28.2631 185.15Z" fill="url(#paint0_linear_83_179)" />
              </g>
              <defs>
                <filter id="filter0_g_83_179" x="9.16895" y="8.83984" width="222.243" height="183.623" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" seed="5034" />
                  <feDisplacementMap in="shape" scale="6" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                  <feMerge result="effect1_texture_83_179">
                    <feMergeNode in="displacedImage" />
                  </feMerge>
                </filter>
                <linearGradient id="paint0_linear_83_179" x1="227.487" y1="89.4954" x2="10.9341" y2="114.568" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1A1714" />
                  <stop offset="0.471154" stopColor="#868E8F" />
                  <stop offset="1" stopColor="#262626" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-[146px] w-[145px] flex flex-col justify-start">
            <p className="font-roboto font-bold text-[12px] leading-[18px] text-center text-[#ADADAD]">
              <span className="text-[#F8F8F8]">20</span>
              <span className="text-white"> / 50</span>
              <span className="text-[#F8F8F8]"> </span>
              for next rank
            </p>
          </div>

          <div className="absolute left-[143px] top-[139px] w-[43px] h-[43px]">
            <svg width="100%" height="100%" viewBox="0 0 43 43" fill="none">
              <path d="M18.0662 4.42052C19.07 3.6749 20.3954 3.52145 21.543 4.01797L34.7414 9.72829C35.8891 10.2248 36.6846 11.296 36.8285 12.5382L38.4824 26.8236C38.6263 28.0657 38.0965 29.2904 37.0927 30.036L25.5482 38.6111C24.5444 39.3567 23.2191 39.5102 22.0715 39.0136L8.87301 33.3033C7.72538 32.8068 6.9298 31.7356 6.78599 30.4935L5.13199 16.208C4.98818 14.9659 5.51794 13.7412 6.52175 12.9956L18.0662 4.42052Z" fill="url(#paint0_linear_83_182)" stroke="url(#paint1_linear_83_182)" />
              <path d="M17.2821 19.7482C17.2165 19.1815 17.1502 18.6322 17.0897 18.0822C16.9461 16.7747 17.3178 15.6518 18.1923 14.7316C18.9086 13.9779 19.7951 13.6155 20.8142 13.5981C22.3846 13.5712 23.9324 14.6683 24.4727 16.4103C24.5494 16.6575 24.5993 16.9167 24.6341 17.1743C24.7096 17.7341 24.7673 18.2962 24.8342 18.8735C24.985 18.8561 25.1305 18.8392 25.2758 18.8224C25.6339 18.7802 25.9614 18.8606 26.2443 19.1081C26.475 19.3098 26.6127 19.5713 26.649 19.8804C26.9146 22.1495 27.1778 24.4189 27.4379 26.6885C27.5135 27.3475 27.0544 27.9531 26.4274 28.0262C23.5574 28.3604 20.6875 28.6927 17.8171 29.0231C17.1628 29.0984 16.593 28.6126 16.5093 27.9048C16.3423 26.4957 16.1817 25.0856 16.0181 23.6761C15.9235 22.859 15.8275 22.042 15.7336 21.2247C15.6652 20.6299 15.941 20.1166 16.455 19.8969C16.5696 19.8481 16.6958 19.825 16.8191 19.8037C16.9678 19.778 17.1192 19.767 17.2819 19.7482L17.2821 19.7482ZM23.5937 19.0117C23.5365 18.5181 23.4821 18.0305 23.4228 17.5435C23.3998 17.3542 23.38 17.1624 23.3347 16.9781C22.9869 15.5592 21.6295 14.6888 20.2671 15.0053C19.0269 15.2935 18.1732 16.561 18.3234 17.8932C18.3837 18.4279 18.4472 18.9623 18.5091 19.4968C18.5129 19.5303 18.5197 19.5634 18.5255 19.5985L23.5935 19.0118L23.5937 19.0117ZM22.6434 22.9472C22.5477 22.0925 21.7742 21.5788 21.0905 21.8549C20.6153 22.047 20.3414 22.4195 20.3334 22.9595C20.3261 23.4642 20.5577 23.8472 20.9884 24.0863C21.0503 24.1206 21.0711 24.1554 21.0714 24.2272C21.073 24.6434 21.0752 25.06 21.0864 25.4761C21.0972 25.8766 21.2832 26.2284 21.7705 26.205C22.3011 26.1793 22.542 25.8698 22.4292 25.3202C22.3455 24.9123 22.2591 24.5049 22.1695 24.0982C22.154 24.0277 22.1673 23.9882 22.2206 23.9425C22.5413 23.6663 22.6712 23.3041 22.6434 22.9472Z" fill="#AEAEAE" />
              <defs>
                <linearGradient id="paint0_linear_83_182" x1="19.622" y1="2.64189" x2="23.9925" y2="40.3897" gradientUnits="userSpaceOnUse">
                  <stop stopColor="black" />
                  <stop offset="1" stopColor="#666666" />
                </linearGradient>
                <linearGradient id="paint1_linear_83_182" x1="23.9925" y1="40.3897" x2="19.622" y2="2.64189" gradientUnits="userSpaceOnUse">
                  <stop stopColor="black" />
                  <stop offset="1" stopColor="#666666" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 w-[74px] h-[4px] bg-[#00ff4f]" />

          <div className="absolute left-[16px] top-[32px] w-[145px] flex flex-col justify-start gap-2">
            <div className="flex flex-col justify-start">
              <p className="font-bangers text-[24px] leading-[22px] text-center text-white">PRODUCER</p>
            </div>
            <div className="flex flex-col justify-start">
              <p className="font-roboto text-[14px] leading-[15px] text-center text-[#F8F8F8]">Coke Productions</p>
              <p className="font-roboto text-[14px] leading-[15px] text-center text-[#F8F8F8]">Completed</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-[10px] w-[min-content] bg-gradient-to-b from-black to-[#666] border border-black rounded px-2 py-1 mx-auto">
              <p className="font-roboto flex font-medium text-[12px] text-center text-white uppercase">
                <span className="text-[#ADADAD]">RANK:</span>
                <span className="text-[#FFAA22]"> </span>
                CAPTAIN
              </p>
            </div>
          </div>

          <div className="absolute left-[4px] top-[4px] w-[32px] h-[32px]">
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="paint0_linear_close2" x1="15.6676" y1="30.1216" x2="15.6676" y2="2.12161" gradientUnits="userSpaceOnUse">
                  <stop stopColor="black" />
                  <stop offset="1" stopColor="#666666" />
                </linearGradient>
                <linearGradient id="paint1_linear_close2" x1="26.3312" y1="25.6241" x2="10.8844" y2="2.31407" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9900" />
                  <stop offset="1" stopColor="#FFCE7E" />
                </linearGradient>
              </defs>
              <circle cx="15.6676" cy="16.1216" r="13.7083" transform="rotate(-6.60441 15.6676 16.1216)" stroke="url(#paint0_linear_close2)" strokeWidth="0.583333" />
              <path d="M10.1142 10.3578C10.1285 10.2031 10.0922 10.0848 9.97333 9.98775C9.83458 9.87439 9.76776 9.71475 9.74085 9.53662C9.71067 9.33726 9.67911 9.13778 9.64064 8.93993C9.61532 8.81095 9.6539 8.76436 9.78702 8.74895C12.1355 8.48174 14.4838 8.20986 16.832 7.93825C17.7838 7.82805 18.7354 7.71566 19.6871 7.60464C19.8797 7.58233 19.8968 7.59559 19.9108 7.79379C19.9245 7.99034 19.9264 8.18827 19.9472 8.38401C19.9662 8.56471 19.9197 8.72473 19.8133 8.85982C19.7204 8.97782 19.7129 9.09398 19.7677 9.24005C19.8963 9.22517 20.0297 9.20972 20.163 9.19428C20.7468 9.12697 21.3302 9.05471 21.9144 8.994C22.3634 8.94727 22.7437 9.1751 22.9196 9.58318C22.9517 9.65788 22.9834 9.73791 22.9913 9.81792C23.0834 10.7572 23.0856 11.6959 22.8325 12.6092C22.4336 14.0488 21.5581 15.1129 20.2845 15.857C19.731 16.1802 19.1338 16.3464 18.5125 16.4477C18.3732 16.4705 18.2629 16.5229 18.1629 16.6287C17.836 16.975 17.4306 17.217 17.0321 17.4665C17.0028 17.4849 16.9667 17.4916 16.9429 17.5001C16.8638 17.8693 16.8424 18.2315 16.9012 18.598C16.99 19.1502 17.273 19.6061 17.6065 20.0313C17.8763 20.3751 18.2008 20.6656 18.6041 20.8381C18.7377 20.8953 18.9 20.8934 19.0497 20.8985C19.1613 20.9022 19.2734 20.8706 19.3858 20.8601C19.6949 20.8313 19.8855 20.9888 19.9264 21.3002C19.9629 21.5773 20.0039 21.8538 20.0387 22.1311C20.073 22.4037 20.1025 22.6771 20.1348 22.9561C20.3373 22.9623 20.4683 23.0485 20.5355 23.235C20.6007 23.4156 20.5502 23.5576 20.3649 23.6039C20.1951 23.6466 20.0183 23.6624 19.8437 23.6826C17.5858 23.9473 15.3279 24.2112 13.0696 24.4747C13.0023 24.4825 12.9342 24.4939 12.8671 24.4901C12.7506 24.4833 12.615 24.5126 12.575 24.3396C12.5223 24.111 12.5757 23.9332 12.7355 23.8485C12.7744 23.8279 12.8167 23.8142 12.8941 23.7822C12.8438 23.3477 12.7898 22.9019 12.7419 22.4558C12.7249 22.2965 12.7158 22.1357 12.7161 21.9757C12.7167 21.7473 12.8247 21.6422 13.0944 21.596C13.1744 21.5823 13.2562 21.5743 13.3372 21.5732C13.637 21.5698 13.8688 21.4302 14.0709 21.2183C14.645 20.6176 14.9629 19.896 15.0409 19.0669C15.0768 18.6859 14.9755 18.3257 14.838 17.9703C14.7729 17.8021 14.6751 17.7264 14.5139 17.6788C14.0791 17.5504 13.6632 17.3744 13.2827 17.1186C13.2495 17.0961 13.1979 17.096 13.1549 17.0951C12.5924 17.086 12.0283 17.1297 11.4713 16.9911C10.8358 16.833 10.2198 16.6216 9.6708 16.2576C8.92418 15.7623 8.34461 15.1036 7.90929 14.311C7.53579 13.6301 7.33776 12.8915 7.17742 12.1388C7.13847 11.9557 7.09844 11.768 7.09798 11.5824C7.09703 11.1685 7.37108 10.672 7.97704 10.6058C8.64666 10.5327 9.315 10.4508 9.98402 10.3725C10.0282 10.3674 10.0721 10.3623 10.1142 10.3575L10.1142 10.3578ZM21.8935 10.101C21.8817 10.0983 21.8686 10.0912 21.8562 10.0926C21.21 10.1677 20.564 10.2447 19.9174 10.3185C19.8315 10.3284 19.8194 10.3725 19.8241 10.4487C19.8434 10.7643 19.8568 11.0801 19.8745 11.3957C19.9429 12.6162 19.7811 13.8017 19.3625 14.9487C19.3445 14.9979 19.3516 15.0569 19.3459 15.1238C21.2392 14.3589 22.3632 12.1271 21.8935 10.1013L21.8935 10.101ZM8.22649 11.6776C8.44677 14.0166 9.77278 15.5699 11.7952 15.9725C11.7783 15.8952 11.7813 15.8173 11.747 15.7639C11.0657 14.7027 10.6617 13.539 10.4705 12.2935C10.427 12.0095 10.367 11.7277 10.3128 11.4361L8.22649 11.6776Z" fill="url(#paint1_linear_close2)" />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden max-[809px]:relative max-[809px]:mt-4 w-full h-full">
          <div className="bg-gradient-to-b from-[#090927] to-[#49497e] border-[1.3px] border-black rounded-[5px] flex flex-col gap-[5px] justify-center items-center p-[10.5px] w-[120px] relative">
            <div className="flex flex-col justify-start">
              <p className="font-roboto font-bold text-[18.4px] text-[#BBD1FF]">RESPECT</p>
            </div>
            <div className="relative w-[70px] h-[32px] overflow-visible">
              <div className="absolute left-0 top-[-1px] w-[32px] h-[33px]">
                <svg width="100%" height="100%" viewBox="0 0 32 33" fill="none">
                  <defs>
                    <linearGradient id="paint0_linear_respect" x1="15.9684" y1="0.882812" x2="15.9684" y2="32.419" gradientUnits="userSpaceOnUse">
                      <stop stopColor="black" />
                      <stop offset="1" stopColor="#666666" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_respect" x1="15.9684" y1="32.419" x2="15.9684" y2="0.882812" gradientUnits="userSpaceOnUse">
                      <stop stopColor="black" />
                      <stop offset="1" stopColor="#666666" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_respect" x1="15.3114" y1="8.17676" x2="15.3114" y2="25.8487" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9EBEFF" />
                      <stop offset="1" stopColor="#356FB2" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_respect" x1="18.2178" y1="9.37549" x2="18.2178" y2="15.0549" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9EBEFF" />
                      <stop offset="1" stopColor="#356FB2" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_respect" x1="13.2415" y1="7.45264" x2="13.2415" y2="10.3363" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9EBEFF" />
                      <stop offset="1" stopColor="#356FB2" />
                    </linearGradient>
                  </defs>
                  <circle cx="15.9684" cy="16.6509" r="15.1111" fill="url(#paint0_linear_respect)" />
                  <circle cx="15.9684" cy="16.6509" r="15.1111" stroke="url(#paint1_linear_respect)" strokeWidth="1.31401" />
                  <path d="M16.6297 19.7917C16.9457 19.4511 16.9825 18.9891 16.995 18.5577C17.026 17.4742 16.7917 16.4726 15.9841 15.711C15.5378 15.2906 15.0863 14.8765 14.6203 14.4444C14.7657 14.2578 14.9546 14.0212 15.1376 13.7792C15.5641 13.2138 15.7037 12.5597 15.6181 11.8598C15.5648 11.4256 15.3265 11.0954 14.9474 10.8936C14.7828 10.8062 14.617 10.723 14.4077 10.6147C14.7776 9.90515 15.11 9.19347 15.5174 8.53312C15.6405 8.33404 15.9669 8.19739 16.2105 8.17936C16.4882 8.15924 16.7963 8.25843 17.0569 8.38537C17.5637 8.63231 17.7046 9.05821 17.4597 9.58399C16.9733 10.6279 16.4691 11.6622 15.959 12.6936C15.6925 13.2319 15.5542 13.7722 15.6872 14.3861C15.8998 15.3738 16.8285 15.9787 17.7592 15.7012C17.8843 15.6638 18.006 15.6145 18.1522 15.5625C18.1831 15.6395 18.2153 15.7068 18.2371 15.7775C18.6287 17.0469 20.0557 17.3757 20.9048 16.3907C21.3438 15.8816 21.5695 15.0187 21.4458 14.28C21.2799 14.5824 21.1378 14.8737 20.9666 15.1449C20.7981 15.4127 20.6171 15.677 20.4118 15.9142C20.0682 16.311 19.8141 16.354 19.3935 16.1396C19.0328 15.9558 18.8077 15.5417 18.8676 15.1179C18.8959 14.916 18.9525 14.71 19.0388 14.5283C19.5192 13.5197 20.0109 12.5181 20.5026 11.5151C20.8251 10.8568 21.0542 10.7944 21.6788 11.1246C22.2626 11.4332 22.5417 11.9348 22.5384 12.5972C22.5298 14.3049 22.5641 16.0175 22.4561 17.7191C22.3627 19.1972 21.6821 20.4617 20.7678 21.5736C20.629 21.7422 20.5533 21.8927 20.5658 22.1195C20.6211 23.1337 20.6612 24.1492 20.7073 25.164C20.7277 25.61 20.5401 25.8437 20.1169 25.8444C17.4847 25.85 14.852 25.85 12.2198 25.8451C11.8038 25.8444 11.5893 25.6107 11.6235 25.1633C11.6794 24.4398 11.7703 23.7198 11.8473 22.9977C11.8775 22.7112 11.9124 22.4254 11.9407 22.1383C11.9809 21.7353 11.8993 21.3822 11.6656 21.0368C10.6105 19.4781 9.59689 17.889 8.52995 16.3401C7.91848 15.4522 7.98562 14.5748 8.43319 13.6827C8.88274 12.7872 9.36718 11.9098 9.85424 11.0358C10.2492 10.3269 10.6184 10.1542 11.3622 10.3796C12.4087 10.6973 13.4447 11.0538 14.4807 11.4097C14.8974 11.5526 15.0685 11.9507 14.9573 12.4848C14.8441 13.0279 14.5893 13.4941 14.197 13.8693C13.9206 14.1336 13.5671 14.1177 13.2631 14.0164C12.8214 13.87 12.41 13.6245 11.9802 13.4351C11.8525 13.3789 11.7064 13.3706 11.5689 13.3401C11.5728 13.4767 11.5445 13.6272 11.5879 13.7479C11.6781 13.997 11.6584 14.1967 11.4497 14.3577C11.3266 14.4527 11.1884 14.529 11.0778 14.6372C10.9863 14.7274 10.9251 14.8515 10.8508 14.9611C10.9903 15.0007 11.1516 15.1068 11.2654 15.0659C11.5419 14.9667 11.8117 14.8231 12.0559 14.6531C12.3008 14.4832 12.5127 14.4666 12.7832 14.5886C13.3124 14.8279 13.9035 14.9486 14.3866 15.2608C15.4674 15.9586 16.3507 16.8687 16.5244 18.2858C16.5843 18.7727 16.5337 19.2742 16.5337 19.7688C16.5666 19.7764 16.5988 19.784 16.6317 19.7917H16.6297Z" fill="url(#paint2_linear_respect)" />
                  <path d="M16.2725 13.8559C16.3726 13.5555 16.445 13.2406 16.5779 12.9576C17.063 11.9275 17.5632 10.9058 18.0687 9.88684C18.3149 9.39088 18.5459 9.29447 19.0692 9.4332C19.2482 9.48106 19.4305 9.53308 19.5971 9.61563C20.1223 9.87505 20.306 10.4022 20.0486 10.9336C19.5036 12.06 18.9428 13.1789 18.3978 14.3054C18.151 14.8152 17.7331 15.0385 17.2289 15.0545C16.6924 15.0711 16.3271 14.5613 16.2719 13.8559H16.2725Z" fill="url(#paint3_linear_respect)" />
                  <path d="M11.7273 9.73667C12.1505 9.07146 12.5059 8.43677 12.9338 7.86174C13.3373 7.31862 14.212 7.3207 14.6543 7.84163C14.7557 7.96093 14.7859 8.25018 14.7228 8.40417C14.4687 9.02429 14.1686 9.62291 13.877 10.225C13.85 10.2805 13.7513 10.3478 13.7058 10.3346C13.0601 10.148 12.4184 9.94823 11.728 9.73667H11.7273Z" fill="url(#paint4_linear_respect)" />
                </svg>
              </div>
              <div className="absolute left-[37px] top-[4px] w-auto h-auto">
                <div className="font-roboto font-bold text-[24px] leading-[1em] tracking-[-0.03em] text-white whitespace-nowrap">
                  <Counter
                    from={0}
                    to={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default function Features() {
  return (
    <section
      id="features"
      className="flex flex-col items-start justify-start gap-16 w-full max-w-[1400px] mx-auto px-8 overflow-visible max-[809px]:px-8"
    >
      <AppearAnimation delay={0} duration={0.5} bounce={0.2} direction="up" className="w-full">
        <PlayToEarn />
      </AppearAnimation>
      <AppearAnimation delay={0} duration={0.5} bounce={0.2} direction="up" className="w-full">
        <RealWorldEconomies />
      </AppearAnimation>
      <AppearAnimation delay={0} duration={0.5} bounce={0.2} direction="up" className="w-full">
        <RankUpRespect />
      </AppearAnimation>
    </section>
  );
}