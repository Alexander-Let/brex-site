import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeOut, fadeInUp, viewportOnce } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  soft?: boolean
}

/** Scroll reveal that always ends visible (never stuck at opacity 0). */
export function Reveal({ children, className, soft = false }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={soft ? { opacity: 0, y: 12 } : fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={viewportOnce}
      transition={{ duration: soft ? 0.4 : 0.5, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  fast?: boolean
  role?: string
  'aria-label'?: string
}

export function Stagger({
  children,
  className,
  fast = false,
  role,
  'aria-label': ariaLabel,
}: StaggerProps) {
  const reduce = useReducedMotion()
  const a11y = { role, 'aria-label': ariaLabel }

  if (reduce) {
    return (
      <div className={className} {...a11y}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: fast ? 0.04 : 0.07,
            delayChildren: fast ? 0.02 : 0.04,
          },
        },
      }}
      {...a11y}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  soft = false,
}: {
  children: ReactNode
  className?: string
  soft?: boolean
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: soft ? 10 : 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: soft ? 0.35 : 0.45, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
