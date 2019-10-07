import { commandFactory } from '../command-factory'
import { smartSortLayers } from '../smart-sort-layers'

export default commandFactory({
  sortLayers: smartSortLayers,
  successMessage: 'Smart sorted selected layers'
})
