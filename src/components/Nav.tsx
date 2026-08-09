import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { docsHub, LINKS } from '../content/links'
import { useLocale } from '../i18n/LocaleContext'
import { easeOut, hoverLift, springSnappy, tapScale } from '../lib/motion'
import { Magnetic } from './Magnetic'

export function Nav() {
  const { t, locale, toggleLocale } = useLocale()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  const nav = [
    { href: '#why', label: t.nav.why },
    { href: '#language', label: t.nav.language },
    { href: '#examples', label: t.nav.examples },
    { href: '#install', label: t.nav.install },
    { href: docsHub(locale), label: t.nav.docs, external: true },
    { href: LINKS.github, label: t.nav.github, external: true },
  ] as const

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toggleLabel = locale === 'en' ? t.langToggle.toRu : t.langToggle.toEn

  return (
    <header className="sticky top-0 z-40 border-b-[2.5px] border-ink bg-paper/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8"
        aria-label={t.nav.primary}
      >
        <motion.a
          href="#top"
          className="font-display text-xl tracking-wide text-ink no-underline md:text-2xl"
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          transition={springSnappy}
        >
          Brex
        </motion.a>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  {...('external' in item && item.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="relative text-sm font-medium text-ink-muted no-underline underline-offset-4 decoration-2 hover:underline"
                  whileHover={reduce ? undefined : { color: 'var(--color-ink)', y: -1 }}
                  transition={springSnappy}
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>

          <Magnetic
            onClick={toggleLocale}
            className="ink-border ink-shadow bg-mustard px-2.5 py-1.5 font-mono text-xs font-bold tracking-wide text-ink"
            aria-label={t.langToggle.aria}
            title={t.langToggle.aria}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={toggleLabel}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                {toggleLabel}
              </motion.span>
            </AnimatePresence>
          </Magnetic>

          <motion.button
            type="button"
            className="ink-border ink-shadow flex h-10 w-10 items-center justify-center bg-paper-light text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
            whileHover={reduce ? undefined : hoverLift}
            whileTap={reduce ? undefined : tapScale}
            transition={springSnappy}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'list'}
                initial={reduce ? false : { opacity: 0, rotate: -40, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="inline-flex"
              >
                {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden border-t-[2.5px] border-ink bg-paper lg:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: easeOut }}
          >
            <ul className="flex flex-col gap-3 px-4 py-4">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3, ease: easeOut }}
                >
                  <a
                    href={item.href}
                    {...('external' in item && item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="block py-1 text-base font-medium text-ink no-underline"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
