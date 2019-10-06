import { render } from 'figma-ui/src/render'
import { DistributeLayers } from './components/distribute-layers'

export function uiFactory (props) {
  return render(DistributeLayers, props)
}
