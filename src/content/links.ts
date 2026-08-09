import type { Locale } from '../i18n/messages'

export const LINKS = {
  github: 'https://github.com/Alexander-Let/Brex',
  docsEn: 'https://github.com/Alexander-Let/Brex/tree/main/docs/en',
  docsRu: 'https://github.com/Alexander-Let/Brex/tree/main/docs/ru',
  releases: 'https://github.com/Alexander-Let/Brex/releases',
  license: 'https://github.com/Alexander-Let/Brex/blob/main/LICENSE',
} as const

function doc(locale: Locale, path: string) {
  return `https://github.com/Alexander-Let/Brex/blob/main/docs/${locale}/${path}`
}

export const docsHub = (locale: Locale) =>
  locale === 'ru' ? LINKS.docsRu : LINKS.docsEn

export const languageGuide = (locale: Locale) => doc(locale, 'LANGUAGE.md')

export const grammarGuide = (locale: Locale) => doc(locale, 'grammar.md')
