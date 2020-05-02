import { getParentLayers } from './utilities/get-parent-layers'
import { getRootLayers } from './utilities/get-root-layers'
import { mainFactory } from './utilities/main-factory'

export const selectParentLayers = mainFactory('parent layer', getParentLayers)

export const selectRootLayers = mainFactory('root layer', getRootLayers)
