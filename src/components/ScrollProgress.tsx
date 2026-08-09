import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Thin reading progress under the sticky nav. */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <div
      className="pointer-events-none fixed top-16 right-0 left-0 z-[45] h-[3px] bg-ink/15"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-left bg-mustard will-change-transform"
        style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      />
    </div>
  )
}
