import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

const locale = navigator.language.startsWith('de') ? 'de' : 'en'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  fallbackLocale: 'en',
  messages: { en, de },
})

export default i18n
