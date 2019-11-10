import { formatExplicit } from './format-explicit'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  transformCallback: formatExplicit,
  buttonText: 'Set to Explicit Format'
})
