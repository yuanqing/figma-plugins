import { render } from '@create-figma-plugin/ui'

import { distributeLayersFactory } from '../components/distribute-layers-factory'
import { UiFactoryOptions } from './types'

export function uiFactory(options: UiFactoryOptions) {
  return render(distributeLayersFactory(options))
}
