import { motion, useReducedMotion } from 'motion/react'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { docsHub } from '../content/links'
import { useLocale } from '../i18n/LocaleContext'
import { easeOut } from '../lib/motion'
import { Magnetic } from './Magnetic'

export function Hero() {
  const { t, locale } = useLocale()
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-8 px-4 pb-16 pt-8 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20 lg:pt-10"
    >
      <div className="flex flex-col items-start">
        <motion.h1
          className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] tracking-wide text-ink"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: easeOut }}
        >
          {t.hero.brand}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-[28ch] text-xl font-medium leading-snug text-ink md:text-2xl md:leading-snug"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: easeOut, delay: 0.08 }}
        >
          {t.hero.headline}
        </motion.p>
        <motion.p
          className="mt-4 max-w-[42ch] text-base leading-relaxed text-ink-muted md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: easeOut, delay: 0.14 }}
        >
          {t.hero.sub}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: easeOut, delay: 0.2 }}
        >
          <Magnetic
            href="#install"
            className="ink-border ink-shadow items-center justify-center bg-mustard px-5 py-2.5 text-base font-semibold text-ink no-underline"
          >
            {t.hero.install}
          </Magnetic>
          <Magnetic
            href={docsHub(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-border ink-shadow items-center gap-2 bg-paper-light px-5 py-2.5 text-base font-semibold text-ink no-underline"
          >
            {t.hero.docs}
            <ArrowSquareOut size={18} weight="bold" aria-hidden />
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        className="relative flex justify-center lg:justify-end"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.65, ease: easeOut, delay: 0.22 }}
      >
        <img
          src={`${import.meta.env.BASE_URL}mascot-desk.png`}
          alt={t.hero.mascotAlt}
          width={720}
          height={720}
          className="cutout w-full max-w-[560px] bg-paper-deep object-cover"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
    </section>
  )
}
