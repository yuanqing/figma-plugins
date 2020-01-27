import { commandFactory } from './utilities/command-factory'
import { getParentLayers } from './utilities/get-parent-layers'
import { getRootLayers } from './utilities/get-root-layers'

export const selectParentLayers = commandFactory(
  'parent layer',
  getParentLayers
)

export const selectRootLayers = commandFactory('root layer', getRootLayers)
