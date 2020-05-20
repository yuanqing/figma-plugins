import { render } from '@create-figma-plugin/ui'

import { DistributeLayers } from '../components/distribute-layers'

export function uiFactory(props: {
  [key: string]: any
}): (rootNode: HTMLElement, data: { [key: string]: any }) => void {
  return render(DistributeLayers, props)
}
