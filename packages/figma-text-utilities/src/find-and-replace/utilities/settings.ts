import { Settings } from './types.js'

export const settingsKey = '2021-05-01'

export const defaultSettings: Settings = {
  caseSensitive: false,
  findString: '',
  replaceString: '',
  useRegularExpression: false
}
