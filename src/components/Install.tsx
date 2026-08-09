import { motion, useReducedMotion } from 'motion/react'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { LINKS } from '../content/links'
import { useLocale } from '../i18n/LocaleContext'
import { springSnappy } from '../lib/motion'
import { CodeBlock } from './CodeBlock'
import { Magnetic } from './Magnetic'
import { Reveal, Stagger, StaggerItem } from './Reveal'

const CODES = {
  fromSource: `cargo install --path crates/brex-cli
brex --version`,
  quickStart: `brex init -t web-api
brex build
brex doctor
brex explain scaffold`,
} as const

export function Install() {
  const { t } = useLocale()
  const reduce = useReducedMotion()

  const blocks = [
    { title: t.install.fromSource, code: CODES.fromSource },
    { title: t.install.quickStart, code: CODES.quickStart },
  ]

  return (
    <section
      id="install"
      className="border-t-[2.5px] border-ink bg-slate text-paper-light"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl tracking-wide text-paper-light md:text-5xl">
            {t.install.title}
          </h2>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper-light/85 md:text-lg">
            {t.install.lead}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {blocks.map((block) => (
            <StaggerItem key={block.code}>
              <motion.div
                whileHover={
                  reduce
                    ? undefined
                    : { y: -3, transition: springSnappy }
                }
              >
                <CodeBlock code={block.code} label={block.title} />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal
          className="mt-8 max-w-[65ch] font-mono text-sm leading-relaxed text-paper-light/75"
          soft
        >
          <p>brex check · build · run · explain · doctor · drift · allow · hook</p>
        </Reveal>

        <Reveal className="mt-6" soft>
          <Magnetic
            href={LINKS.releases}
            target="_blank"
            rel="noopener noreferrer"
            magnetic={false}
            className="items-center gap-2 font-semibold text-mustard no-underline"
          >
            {t.install.releases}
            <ArrowSquareOut size={16} weight="bold" aria-hidden />
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
