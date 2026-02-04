"use client";

import { ReactNode, CSSProperties } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface AppearAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  bounce?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export default function AppearAnimation({
  children,
  delay = 0,
  duration = 0.4,
  bounce = 0.2,
  threshold = 0.1,
  once = true,
  className = "",
  style = {},
  direction = "none",
  distance = 20,
}: AppearAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-50px 0px -50px 0px",
    amount: threshold 
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  const variants: Variants = {
    hidden: {
      opacity: 0.001,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      ...initialPos,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        bounce: bounce,
        duration: duration,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredAnimationProps {
  children: ReactNode[];
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  bounce?: number;
  className?: string;
  itemClassName?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function StaggeredAnimation({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  duration = 0.4,
  bounce = 0.2,
  className = "",
  itemClassName = "",
  direction = "up",
  distance = 20,
}: StaggeredAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px 0px -50px 0px",
    amount: 0.1 
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  };

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0.001,
      ...initialPos,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        bounce: bounce,
        duration: duration,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  bounce?: number;
  className?: string;
  style?: CSSProperties;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  bounce = 0.2,
  className = "",
  style = {},
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px 0px -50px 0px" 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.001 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0.001 }}
      transition={{
        type: "spring",
        bounce: bounce,
        duration: duration,
        delay: delay,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}