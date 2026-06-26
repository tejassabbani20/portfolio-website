// src/utils/animations.js

export const ease = {
  smooth: [0.25, 0.1, 0.25, 1],
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  springSnappy: { type: 'spring', stiffness: 200, damping: 20 },
  springBouncy: { type: 'spring', stiffness: 300, damping: 10 },
  easeOut: [0.0, 0.0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const staggerContainer = (staggerTime = 0.1, delayStart = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delayStart,
    },
  },
});

export const letterVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  tap: { scale: 0.97 },
};

export const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const timelineLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const timelineRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const pulseGlow = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const rotateLoop = {
  animate: {
    rotate: 360,
    transition: { duration: 12, repeat: Infinity, ease: 'linear' },
  },
};
