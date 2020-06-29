export const easing = [0.6, -0.5, 0.01, 0.99];

export const background = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  transition: {
    ease: easing,
  },
};

export const motionModal = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
  transition: {
    delay: 0.5,
    ease: easing,
    duration: 0.5,
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: easing,
      duration: 0.4,
    },
  },
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const container = {
  hidden: { width: 0 },
  visible: {
    width: '90vw',
    transition: { delay: 0.5, duration: 0.3, ease: easing },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.8, duration: 1, ease: easing },
  },
};

export const fadeInUpDelayed = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: easing,
      duration: 0.4,
      delay: 1.2,
    },
  },
};
