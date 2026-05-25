import type { Variants } from 'framer-motion';

// Easing standards
export const EASE = {
  entrance: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  hover: [0.25, 0.46, 0.45, 0.94] as const,
  smooth: [0.43, 0.13, 0.23, 0.96] as const,
};

// Viewport settings for scroll-triggered animations
export const viewportOnce = {
  once: true,
  margin: "-60px" as const,
};

// Fade up animation
export function fadeUp(delay?: number): Variants {
  return {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay || 0,
        ease: EASE.entrance,
      },
    },
  };
}

// Fade in animation
export function fadeIn(delay?: number): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: delay || 0,
        ease: EASE.entrance,
      },
    },
  };
}

// Slide from left
export function slideLeft(delay?: number): Variants {
  return {
    hidden: { opacity: 0, x: 48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay || 0,
        ease: EASE.entrance,
      },
    },
  };
}

// Slide from right
export function slideRight(delay?: number): Variants {
  return {
    hidden: { opacity: 0, x: -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay || 0,
        ease: EASE.entrance,
      },
    },
  };
}

// Scale in
export function scaleIn(delay?: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay || 0,
        ease: EASE.entrance,
      },
    },
  };
}

// Stagger container
export function staggerContainer(stagger?: number, delayChildren?: number): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger || 0.1,
        delayChildren: delayChildren || 0,
      },
    },
  };
}

// Stagger item
export function staggerItem(): Variants {
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE.entrance,
      },
    },
  };
}

// Word reveal animation (for headings)
export function wordReveal(delay?: number): Variants {
  return {
    hidden: { opacity: 0, y: '100%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay || 0,
        ease: EASE.entrance,
      },
    },
  };
}

// Mask reveal (clip-path)
export function maskReveal(delay?: number): Variants {
  return {
    hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    visible: {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay || 0,
        ease: EASE.entrance,
      },
    },
  };
}

// Character reveal for headings
export function characterReveal(): Variants {
  return {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.03,
        ease: EASE.entrance,
      },
    }),
  };
}

// Parallax scroll values
export const parallax = {
  slow: { y: [0, -30] },
  medium: { y: [0, -60] },
  fast: { y: [0, -100] },
};
