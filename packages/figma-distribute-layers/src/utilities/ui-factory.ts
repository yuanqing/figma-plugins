import { render } from '@create-figma-plugin/ui'

import { distributeLayersFactory } from '../components/distribute-layers-factory'
import { DistributeLayersProps, UiFactoryOptions } from './types'

export function uiFactory(options: UiFactoryOptions) {
  return render<DistributeLayersProps>(distributeLayersFactory(options))
}
