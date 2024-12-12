import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import no from './locales/no.json'


// Create i18n instance
export const i18n = createI18n({
  legacy: false,  // Use Composition API
  locale: 'no',   // Default language
  fallbackLocale: 'en',
  messages: {
    en,
    no,
  }
})