import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { grammarGuide, languageGuide } from '../content/links'
import { KEYWORDS } from '../i18n/messages'
import { useLocale } from '../i18n/LocaleContext'
import { easeOut, hoverLift, springSnappy, tapScale } from '../lib/motion'
import { CodeBlock } from './CodeBlock'
import { Reveal, Stagger, StaggerItem } from './Reveal'

const SAMPLE = `PROJECT "hello-cli";
DESC "CLI that greets you";
STACK "rust", "clap";

ROLE "Senior backend developer";
CAN "code", "tests";

RULE "Write tests";
GOAL "Has --help and hello";

FILE "app" "src/main.rs";

TASK "bootstrap";
USE "senior_backend_developer";
MAKE "app";
SAY "Build a clap CLI with a hello command";
`

export function Language() {
  const { t, locale } = useLocale()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string | null>('PROJECT')
  const def = active ? t.language.defs[active] : null

  return (
    <section
      id="language"
      className="border-t-[2.5px] border-ink bg-slate text-paper-light"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="font-display text-3xl tracking-wide text-paper-light md:text-5xl">
            {t.language.title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-paper-light/85 md:text-lg">
            {t.language.lead}
          </p>
        </Reveal>

        <Stagger
          className="mt-10 flex flex-wrap gap-2"
          fast
          role="toolbar"
          aria-label={t.language.keywordsAria}
        >
          {KEYWORDS.map((kw) => {
            const selected = active === kw
            return (
              <StaggerItem key={kw} soft>
                <motion.button
                  type="button"
                  aria-pressed={selected}
                  className={`ink-border px-3 py-1.5 font-mono text-sm font-medium ${
                    selected
                      ? 'ink-shadow bg-mustard text-ink'
                      : 'bg-paper text-ink'
                  }`}
                  onClick={() => setActive((cur) => (cur === kw ? null : kw))}
                  whileHover={reduce ? undefined : hoverLift}
                  whileTap={reduce ? undefined : tapScale}
                  transition={springSnappy}
                  layout
                >
                  {kw}
                </motion.button>
              </StaggerItem>
            )
          })}
        </Stagger>

        <motion.div
          className="mt-4 ink-border bg-ink/25 px-4 py-3 text-sm leading-relaxed text-paper-light/90 md:text-base"
          role="status"
          aria-live="polite"
          key={active ?? 'none'}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: easeOut }}
        >
          {active && def ? (
            <>
              <span className="font-mono font-medium text-mustard">{active}</span>
              <span className="text-paper-light/50"> - </span>
              {def}
            </>
          ) : (
            <span className="text-paper-light/70">{t.language.selectHint}</span>
          )}
        </motion.div>

        <Reveal className="mt-8" soft>
          <CodeBlock
            code={SAMPLE}
            label="project.brex"
            className="text-ink"
            highlightKeyword={active}
          />
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap gap-4" soft>
          <motion.a
            href={languageGuide(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-mustard no-underline"
            whileHover={reduce ? undefined : { x: 3 }}
            transition={springSnappy}
          >
            {t.language.guide}
            <ArrowSquareOut size={16} weight="bold" aria-hidden />
          </motion.a>
          <motion.a
            href={grammarGuide(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-mustard no-underline"
            whileHover={reduce ? undefined : { x: 3 }}
            transition={springSnappy}
          >
            {t.language.grammar}
            <ArrowSquareOut size={16} weight="bold" aria-hidden />
          </motion.a>
        </Reveal>
      </div>
    </section>
  )
}
