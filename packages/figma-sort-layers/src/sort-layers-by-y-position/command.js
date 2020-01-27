import { commandFactory } from '../utilities/command-factory'
import { sortLayersByYPosition } from './utilities/sort-layers-by-y-position'

export default commandFactory({
  sortLayers: sortLayersByYPosition,
  successMessage: 'Sorted selected layers by Y position'
})
