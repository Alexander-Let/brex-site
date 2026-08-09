import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CheckCircle, CircleNotch, Play } from '@phosphor-icons/react'
import { EXAMPLES, type ExampleId } from '../content/examples'
import { useLocale } from '../i18n/LocaleContext'
import { easeOut, hoverLift, springSnappy, tapScale } from '../lib/motion'
import { CodeBlock } from './CodeBlock'
import { Magnetic } from './Magnetic'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function Playground() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<ExampleId>('simple')
  const [built, setBuilt] = useState(false)
  const [running, setRunning] = useState(false)
  const [stepIdx, setStepIdx] = useState(-1)
  const example = EXAMPLES.find((e) => e.id === active) ?? EXAMPLES[0]!
  const steps = t.examples.steps

  const labels: Record<ExampleId, string> = {
    simple: t.examples.simple,
    'shop-api': t.examples.block,
  }

  useEffect(() => {
    setBuilt(false)
    setRunning(false)
    setStepIdx(-1)
  }, [active])

  async function runBuild() {
    if (running) return
    setRunning(true)
    setBuilt(false)
    setStepIdx(-1)
    for (let i = 0; i < steps.length; i += 1) {
      setStepIdx(i)
      await new Promise((r) => window.setTimeout(r, 160))
    }
    setBuilt(true)
    setRunning(false)
  }

  return (
    <section id="examples" className="border-t-[2.5px] border-ink">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="font-display text-3xl tracking-wide text-ink md:text-5xl">
            {t.examples.title}
          </h2>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-ink-muted md:text-lg">
            {t.examples.lead}
          </p>
        </Reveal>

        <Stagger
          className="mt-8 flex flex-wrap items-center gap-2"
          fast
          role="tablist"
          aria-label={t.examples.tabsAria}
        >
          {EXAMPLES.map((ex) => {
            const selected = ex.id === active
            return (
              <StaggerItem key={ex.id} soft>
                <motion.button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`tab-${ex.id}`}
                  aria-controls={`panel-${ex.id}`}
                  className={`ink-border px-4 py-2 font-mono text-sm font-medium ${
                    selected
                      ? 'ink-shadow bg-mustard text-ink'
                      : 'bg-paper-light text-ink-muted'
                  }`}
                  onClick={() => setActive(ex.id)}
                  whileHover={reduce ? undefined : hoverLift}
                  whileTap={reduce ? undefined : tapScale}
                  transition={springSnappy}
                  layout
                >
                  {labels[ex.id]}
                </motion.button>
              </StaggerItem>
            )
          })}
        </Stagger>

        <div
          role="tabpanel"
          id={`panel-${example.id}`}
          aria-labelledby={`tab-${example.id}`}
          className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-start"
        >
          <Reveal soft>
            <AnimatePresence mode="wait">
              <motion.div
                key={example.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: easeOut }}
              >
                <CodeBlock code={example.source} label="input.brex" />
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal className="flex flex-col gap-3 lg:w-52" soft>
            <Magnetic
              onClick={runBuild}
              disabled={running}
              className="ink-border ink-shadow w-full items-center justify-center gap-2 bg-mustard px-4 py-3 font-semibold text-ink no-underline disabled:cursor-wait disabled:opacity-70"
            >
              {running ? (
                <>
                  <CircleNotch size={20} className="animate-spin" weight="bold" aria-hidden />
                  {t.examples.building}
                </>
              ) : (
                <>
                  <Play size={20} weight="fill" aria-hidden />
                  {t.examples.runBuild}
                </>
              )}
            </Magnetic>

            <ol className="ink-border bg-paper-light p-3 font-mono text-xs text-ink">
              {steps.map((step, i) => {
                const done = stepIdx > i || (built && stepIdx >= steps.length - 1)
                const current = running && stepIdx === i
                return (
                  <motion.li
                    key={step}
                    className={`flex items-center gap-2 border-b border-ink/15 py-1.5 last:border-0 ${
                      done || current ? 'text-ink' : 'text-ink-muted'
                    }`}
                    animate={
                      current
                        ? { x: [0, 2, 0] }
                        : done
                          ? { scale: [1, 1.02, 1] }
                          : undefined
                    }
                    transition={{ duration: 0.35, ease: easeOut }}
                  >
                    {done ? (
                      <CheckCircle
                        size={14}
                        weight="fill"
                        className="text-mustard-deep"
                        aria-hidden
                      />
                    ) : current ? (
                      <CircleNotch size={14} className="animate-spin" aria-hidden />
                    ) : (
                      <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-ink/30" />
                    )}
                    {step}
                  </motion.li>
                )
              })}
            </ol>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          {built ? (
            <motion.div
              key={`out-${example.id}`}
              className="mt-6"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <CodeBlock code={example.output} label="out/prompts/_project.md" />
            </motion.div>
          ) : (
            <motion.p
              key="waiting"
              className="mt-6 font-mono text-sm text-ink-muted"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t.examples.waiting}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
