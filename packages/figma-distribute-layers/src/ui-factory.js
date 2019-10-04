/** @jsx h */
import { render } from 'figma-ui'
import { App } from './components/app'

export function uiFactory (props) {
  return render(App, props)
}
