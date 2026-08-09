import { ArrowSquareOut, GithubLogo } from '@phosphor-icons/react'
import { LINKS } from '../content/links'
import { useLocale } from '../i18n/LocaleContext'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

export function GitHubSection() {
  const { t } = useLocale()

  return (
    <section id="github" className="border-t-[2.5px] border-ink">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl tracking-wide text-ink md:text-5xl">
            {t.github.title}
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-muted md:text-lg">
            {t.github.lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-border ink-shadow items-center gap-2 bg-mustard px-5 py-2.5 text-base font-semibold text-ink no-underline"
            >
              <GithubLogo size={22} weight="fill" aria-hidden />
              {t.github.viewRepo}
              <ArrowSquareOut size={18} weight="bold" aria-hidden />
            </Magnetic>
            <Magnetic
              href={LINKS.license}
              target="_blank"
              rel="noopener noreferrer"
              magnetic={false}
              className="font-medium text-ink-muted no-underline"
            >
              {t.github.license}
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
