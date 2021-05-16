import { currencies } from './data/currencies.js'
import { locales } from './data/locales.js'

export type CurrencyFormat = 'EXPLICIT' | 'RETAIN' | 'SHORT'
export type CurrencyCode = keyof typeof currencies
export type LocaleCode = keyof typeof locales
export type Status = 'INVALID_SETTINGS' | 'NO_TEXT_NODES' | 'OK'

export type TextNodePlainObject = {
  id: string
  characters: string
}

export type Settings = {
  convertCurrency: {
    currencyCode: CurrencyCode
    roundNumbers: boolean
  }
  formatCurrency: {
    currencyFormat: CurrencyFormat
  }
  localeCode: LocaleCode
}

export type PreviewItem = {
  original: string
  result: string
}
