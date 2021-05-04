import { Settings } from './types'

export const settingsKey = '2021-05-01'

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
