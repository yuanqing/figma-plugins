import { getParentNodes } from './utilities/get-parent-nodes'
import { getRootNodes } from './utilities/get-root-nodes'
import { mainFactory } from './utilities/main-factory'

export const selectParentLayers = mainFactory('parent layer', getParentNodes)

export const selectRootLayers = mainFactory('root layer', getRootNodes)
