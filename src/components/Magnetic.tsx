import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { hoverLift, springMagnetic, springSnappy, tapScale } from '../lib/motion'

type Common = {
  children: ReactNode
  className?: string
  /** Soft pull toward the pointer on fine pointers. Default true. */
  magnetic?: boolean
}

type AsButton = Common &
  Omit<HTMLMotionProps<'button'>, 'children' | 'className'> & {
    href?: undefined
  }

type AsLink = Common &
  Omit<HTMLMotionProps<'a'>, 'children' | 'className'> & {
    href: string
  }

/** Interactive control with soft hover/tap and optional magnetic pull. */
export function Magnetic(props: AsButton | AsLink) {
  const { children, className = '', magnetic = true, ...rest } = props
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, springMagnetic)
  const springY = useSpring(y, springMagnetic)

  const enableMagnetic = magnetic && !reduce

  function onMove(e: PointerEvent<HTMLElement>) {
    if (!enableMagnetic) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(dx * 0.18)
    y.set(dy * 0.18)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const shared = {
    className: `inline-flex will-change-transform ${className}`,
    style: enableMagnetic ? { x: springX, y: springY } : undefined,
    whileHover: reduce ? undefined : hoverLift,
    whileTap: reduce ? undefined : tapScale,
    transition: springSnappy,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
  }

  if ('href' in rest && typeof rest.href === 'string') {
    const linkRest = rest as Omit<AsLink, 'children' | 'className' | 'magnetic'>
    return (
      <motion.a {...shared} {...linkRest}>
        {children}
      </motion.a>
    )
  }

  const buttonRest = rest as Omit<AsButton, 'children' | 'className' | 'magnetic'>
  return (
    <motion.button type={buttonRest.type ?? 'button'} {...shared} {...buttonRest}>
      {children}
    </motion.button>
  )
}
