import { useRef, useState, type PointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { CaretDown } from '@phosphor-icons/react'
import { useLocale } from '../i18n/LocaleContext'
import { easeOut, springMagnetic, springSnappy } from '../lib/motion'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function WhyBrex() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const mascot = useRef<HTMLImageElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springRotX = useSpring(rotX, springMagnetic)
  const springRotY = useSpring(rotY, springMagnetic)

  function onMascotMove(e: PointerEvent<HTMLImageElement>) {
    if (reduce) return
    const img = mascot.current
    if (!img) return
    const r = img.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotY.set(px * 6)
    rotX.set(-py * 6)
  }

  function onMascotLeave() {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <section id="why" className="border-t-[2.5px] border-ink">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl tracking-wide text-ink md:text-5xl">
            {t.why.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
            {t.why.intro}
          </p>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-ink-muted md:text-lg">
            {t.why.problem}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
          <Reveal>
            <h3 className="font-display text-2xl tracking-wide text-ink md:text-3xl">
              {t.why.capabilitiesTitle}
            </h3>
            <ul className="mt-5 divide-y-[2.5px] divide-ink border-y-[2.5px] border-ink">
              {t.why.capabilities.map((item, i) => {
                const open = openIdx === i
                return (
                  <li key={i}>
                    <motion.button
                      type="button"
                      className="flex w-full items-start justify-between gap-3 py-3 text-left hover:bg-paper-deep/30"
                      aria-expanded={open}
                      onClick={() => setOpenIdx((cur) => (cur === i ? null : i))}
                      whileHover={reduce ? undefined : { x: 4 }}
                      transition={springSnappy}
                    >
                      <span className="font-mono text-sm leading-snug text-ink md:text-base">
                        {item.title}
                      </span>
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={springSnappy}
                        className="mt-0.5 shrink-0 text-ink"
                      >
                        <CaretDown size={18} weight="bold" aria-hidden />
                      </motion.span>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          key={`detail-${i}`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: easeOut }}
                          className="overflow-hidden pr-8 text-sm leading-relaxed text-ink-muted md:text-base"
                        >
                          <p className="pb-3">{item.detail}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>

            <h3 className="mt-12 font-display text-2xl tracking-wide text-ink md:text-3xl">
              {t.why.goalTitle}
            </h3>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-ink-muted md:text-lg">
              {t.why.goal}
            </p>
          </Reveal>

          <Stagger className="flex flex-col gap-6">
            <StaggerItem className="self-center lg:self-end" soft>
              <div style={{ perspective: 900 }}>
                <motion.img
                  ref={mascot}
                  src={`${import.meta.env.BASE_URL}mascot-shoebill.png`}
                  alt={t.why.mascotAlt}
                  width={480}
                  height={480}
                  className="ink-border ink-shadow w-full max-w-[420px] bg-paper-deep object-cover will-change-transform"
                  style={{
                    transformStyle: 'preserve-3d',
                    rotateX: reduce ? 0 : springRotX,
                    rotateY: reduce ? 0 : springRotY,
                  }}
                  onPointerMove={onMascotMove}
                  onPointerLeave={onMascotLeave}
                />
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="ink-border ink-shadow bg-paper-light p-5 md:p-6">
                <h3 className="font-display text-xl tracking-wide text-ink md:text-2xl">
                  {t.why.namingTitle}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  {t.why.naming}
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
