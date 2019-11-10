import { changeLocale } from './change-locale'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  transformCallback: changeLocale,
  buttonText: 'Set Locale'
})
