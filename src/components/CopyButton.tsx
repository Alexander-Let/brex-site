import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Copy } from '@phosphor-icons/react'
import { useLocale } from '../i18n/LocaleContext'
import { hoverLift, springSnappy, tapScale } from '../lib/motion'

export function CopyButton({ text }: { text: string }) {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)

  return (
    <motion.button
      type="button"
      className="ink-border inline-flex items-center gap-1.5 bg-paper-light px-2.5 py-1 font-mono text-xs font-medium text-ink"
      whileHover={reduce ? undefined : hoverLift}
      whileTap={reduce ? undefined : tapScale}
      transition={springSnappy}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1400)
        } catch {
          /* ignore */
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'copied' : 'copy'}
          className="inline-flex items-center gap-1.5"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          {copied ? (
            <>
              <Check size={14} weight="bold" aria-hidden />
              {t.code.copied}
            </>
          ) : (
            <>
              <Copy size={14} weight="bold" aria-hidden />
              {t.code.copy}
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
