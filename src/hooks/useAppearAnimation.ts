"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface AppearAnimationOptions {
  delay?: number;
  duration?: number;
  bounce?: number;
  threshold?: number;
  once?: boolean;
}

interface AnimationState {
  isVisible: boolean;
}

/**
 * Custom hook for appear animations using Framer Motion's useInView
 * Based on the animation configuration from index.html:
 * - opacity: 0.001 -> 1
 * - Spring animation with bounce: 0.2, duration: 0.4
 */
export function useAppearAnimation<T extends HTMLElement>(
  options: AppearAnimationOptions = {}
): [React.RefObject<T | null>, AnimationState] {
  const {
    threshold = 0.1,
    once = true,
  } = options;

  const ref = useRef<T>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-50px 0px -50px 0px",
    amount: threshold,
  });

  return [ref, { isVisible: isInView }];
}

export default useAppearAnimation;
