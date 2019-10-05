/** @jsx h */
import { render } from 'figma-ui'
import { DistributeLayers } from './components/distribute-layers'

export function uiFactory (props) {
  return render(DistributeLayers, props)
}
