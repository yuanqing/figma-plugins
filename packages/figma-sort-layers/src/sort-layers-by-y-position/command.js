import { commandFactory } from '../command-factory'
import { sortLayersByYPosition } from '../sort-layers-by-position'

export default commandFactory({
  sortLayers: sortLayersByYPosition,
  successMessage: 'Sorted selected layers by Y position'
})
