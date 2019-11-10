import { formatShort } from './format-short'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  transformCallback: formatShort,
  buttonText: 'Set to Short Format'
})
