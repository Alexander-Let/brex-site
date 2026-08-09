import { LINKS } from '../content/links'
import { useLocale } from '../i18n/LocaleContext'

export function Footer() {
  const { t, locale } = useLocale()
  const date = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(2026, 7, 10))

  return (
    <footer className="border-t-[2.5px] border-ink bg-ink text-paper-light">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl tracking-wide text-paper-light">Brex</p>
          <p className="mt-1 max-w-[36ch] text-sm leading-relaxed text-paper-light/75">
            {t.footer.tagline}
          </p>
          <p className="mt-3 font-mono text-xs text-paper-light/60">{date}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs font-medium text-mustard">{t.footer.docs}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={LINKS.docsEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper-light/85 no-underline hover:text-paper-light hover:underline"
                >
                  {t.footer.english}
                </a>
              </li>
              <li>
                <a
                  href={LINKS.docsRu}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper-light/85 no-underline hover:text-paper-light hover:underline"
                >
                  {t.footer.russian}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs font-medium text-mustard">{t.footer.project}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper-light/85 no-underline hover:text-paper-light hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={LINKS.releases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper-light/85 no-underline hover:text-paper-light hover:underline"
                >
                  {t.footer.releases}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs font-medium text-mustard">{t.footer.legal}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={LINKS.license}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper-light/85 no-underline hover:text-paper-light hover:underline"
                >
                  Apache-2.0
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
