import type { Transition } from 'motion/react'

/** Soft ease for fades and slides */
export const easeOut = [0.22, 1, 0.36, 1] as const

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 28,
  mass: 0.7,
}

export const springMagnetic: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 18,
  mass: 0.6,
}

/** Lenient viewport so reveals don't stay stuck off-screen. */
export const viewportOnce = {
  once: true,
  amount: 0.05,
  margin: '0px 0px -5% 0px',
} as const

export const tapScale = { scale: 0.97, y: 1 }
export const hoverLift = { scale: 1.03, y: -2 }

export const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}
