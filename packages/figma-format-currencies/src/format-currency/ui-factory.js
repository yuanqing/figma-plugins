import { render } from 'figma-ui/src/render'
import { FormatCurrency } from './components/format-currency'

export function uiFactory (props) {
  return render(FormatCurrency, props)
}
