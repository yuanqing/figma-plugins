import { Settings } from './types'

export const defaultSettings: Settings = {
  convertCurrency: {
    currencyCode: 'USD',
    roundNumbers: true
  },
  formatCurrency: {
    currencyFormat: 'RETAIN'
  },
  localeCode: 'en'
}
