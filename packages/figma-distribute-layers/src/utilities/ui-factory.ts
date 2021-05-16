import { render } from '@create-figma-plugin/ui'

import { distributeLayersFactory } from '../components/distribute-layers-factory.js'
import { UiFactoryOptions } from './types.js'

export function uiFactory(options: UiFactoryOptions) {
  return render(distributeLayersFactory(options))
}
