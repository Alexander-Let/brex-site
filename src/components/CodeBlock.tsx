import { CopyButton } from './CopyButton'

const KEYWORDS = new Set([
  'PROJECT',
  'DESC',
  'DESCRIPTION',
  'STACK',
  'ROLE',
  'AGENT',
  'POLE',
  'CAN',
  'RULE',
  'GOAL',
  'FACT',
  'FILE',
  'GATE',
  'TASK',
  'SAY',
  'DOES',
  'DO',
  'USE',
  'USING',
  'MAKE',
  'PRODUCES',
  'NEED',
  'NEEDS',
  'AFTER',
  'DONE',
  'DONE_WHEN',
  'ALLOW',
  'FORBID',
  'BUDGET',
  'import',
  'project',
  'context',
  'goal',
  'agent',
  'artifact',
  'gate',
  'task',
  'param',
])

type Token =
  | { kind: 'comment' | 'string' | 'keyword' | 'punct' | 'plain'; text: string }

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < code.length) {
    if (code[i] === '#' || (code[i] === '/' && code[i + 1] === '/')) {
      const start = i
      while (i < code.length && code[i] !== '\n') i += 1
      tokens.push({ kind: 'comment', text: code.slice(start, i) })
      continue
    }
    if (code[i] === '"' && code[i + 1] === '"' && code[i + 2] === '"') {
      const start = i
      i += 3
      while (i < code.length && !(code[i] === '"' && code[i + 1] === '"' && code[i + 2] === '"')) {
        i += 1
      }
      i = Math.min(i + 3, code.length)
      tokens.push({ kind: 'string', text: code.slice(start, i) })
      continue
    }
    if (code[i] === '"') {
      const start = i
      i += 1
      while (i < code.length && code[i] !== '"' && code[i] !== '\n') {
        if (code[i] === '\\') i += 2
        else i += 1
      }
      if (code[i] === '"') i += 1
      tokens.push({ kind: 'string', text: code.slice(start, i) })
      continue
    }
    if (/[A-Za-z_]/.test(code[i]!)) {
      const start = i
      while (i < code.length && /[A-Za-z0-9_]/.test(code[i]!)) i += 1
      if (code[i] === '!') i += 1
      const word = code.slice(start, i)
      const base = word.endsWith('!') ? word.slice(0, -1) : word
      tokens.push({
        kind: KEYWORDS.has(base) ? 'keyword' : 'plain',
        text: word,
      })
      continue
    }
    if ('{}[]();,=!'.includes(code[i]!)) {
      tokens.push({ kind: 'punct', text: code[i]! })
      i += 1
      continue
    }
    const start = i
    i += 1
    while (
      i < code.length &&
      !/[A-Za-z_#"/{}\[\]();,=!]/.test(code[i]!) &&
      !(code[i] === '/' && code[i + 1] === '/')
    ) {
      i += 1
    }
    tokens.push({ kind: 'plain', text: code.slice(start, i) })
  }
  return tokens
}

const CLASS: Record<Token['kind'], string> = {
  comment: 'text-ink-muted/80 italic',
  string: 'text-slate-deep',
  keyword: 'font-medium text-mustard-deep',
  punct: 'text-ink-muted',
  plain: 'text-ink',
}

type Props = {
  code: string
  className?: string
  label?: string
  /** When set, matching keyword tokens get a mustard highlight wash. */
  highlightKeyword?: string | null
}

export function CodeBlock({
  code,
  className = '',
  label,
  highlightKeyword = null,
}: Props) {
  const tokens = tokenize(code.trimEnd())
  const highlight = highlightKeyword?.toUpperCase() ?? null

  return (
    <div className={`ink-border ink-shadow overflow-hidden bg-paper-light ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b-[2.5px] border-ink bg-ink px-3 py-1.5">
        <span className="font-mono text-xs font-medium tracking-wide text-paper-light">
          {label ?? 'code'}
        </span>
        <CopyButton text={code.trimEnd()} />
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed md:text-sm">
        <code className="font-mono whitespace-pre">
          {tokens.map((t, idx) => {
            const base = t.text.endsWith('!') ? t.text.slice(0, -1) : t.text
            const lit =
              highlight &&
              t.kind === 'keyword' &&
              base.toUpperCase() === highlight
            return (
              <span
                key={idx}
                className={`${CLASS[t.kind]}${
                  lit ? ' rounded-sm bg-mustard/55 px-0.5 text-ink' : ''
                }`}
              >
                {t.text}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
