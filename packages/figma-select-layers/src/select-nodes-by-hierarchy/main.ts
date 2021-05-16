import { getParentNodes } from './utilities/get-parent-nodes.js'
import { getRootNodes } from './utilities/get-root-nodes.js'
import { mainFactory } from './utilities/main-factory.js'

export const selectParentLayers = mainFactory('parent layer', getParentNodes)

export const selectRootLayers = mainFactory('root layer', getRootNodes)
