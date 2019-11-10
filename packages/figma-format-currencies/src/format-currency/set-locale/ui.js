import { setLocale } from './set-locale'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  transformCallback: setLocale,
  buttonText: 'Set Locale'
})
