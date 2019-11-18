import { render } from '@create-figma-plugin/ui'
import { DistributeLayers } from './components/distribute-layers'

export function uiFactory (props) {
  return render(DistributeLayers, props)
}
