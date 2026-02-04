"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import AppearAnimation from "./AppearAnimation";

const screens = [
  {
    src: "/images/screen1.jpg",
    width: 616,
    height: 400,
    alt: "Desktop Inventory 1",
    type: "desktop",
  },
  {
    src: "/images/screen2.jpg",
    width: 185,
    height: 401,
    alt: "Mobile Inventory Airdrop",
    type: "mobile",
  },
  {
    src: "/images/screen3.jpg",
    width: 616,
    height: 400,
    alt: "Desktop Inventory",
    type: "desktop",
  },
  {
    src: "/images/screen4.jpg",
    width: 185,
    height: 401,
    alt: "Mobile Active Raid",
    type: "mobile",
  },
  {
    src: "/images/screen5.jpg",
    width: 616,
    height: 400,
    alt: "Desktop Inventory 2",
    type: "desktop",
  },
  {
    src: "/images/screen6.jpg",
    width: 184,
    height: 401,
    alt: "Mobile Upgrades",
    type: "mobile",
  },
];

export default function Screens() {
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <AppearAnimation delay={0} duration={0.4} bounce={0.2}>
      <section
        id="screens"
        className="flex flex-col items-start justify-start gap-4 w-full h-min overflow-visible pt-[120px] relative"
      >
        <div className="w-full h-[400px] relative">
          <section
            className="flex w-full h-full max-w-full max-h-full place-items-center m-0 p-0 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)",
            }}
          >
            <ul
              ref={scrollRef}
              className="flex w-max h-full max-h-full place-items-center m-0 p-0 list-none gap-2 relative flex-row"
              style={{ willChange: "transform" }}
            >

              {[...screens, ...screens].map((screen, index) => (
                <li key={index} className="flex-shrink-0">
                  <div
                    className={`relative border border-white/[0.13] rounded-lg overflow-hidden ${
                      screen.type === "desktop"
                        ? "w-[616px] h-[400px]"
                        : "w-[185px] h-[401px]"
                    }`}
                    style={{
                      aspectRatio:
                        screen.type === "desktop"
                          ? "1.5397148228412312 / 1"
                          : "0.46126762025001966 / 1",
                    }}
                  >
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </AppearAnimation>
  );
}

