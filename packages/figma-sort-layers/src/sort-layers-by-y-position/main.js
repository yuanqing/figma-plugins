import { mainFactory } from '../utilities/main-factory'
import { sortLayersByYPosition } from './utilities/sort-layers-by-y-position'

export default mainFactory({
  sortLayers: sortLayersByYPosition,
  successMessage: 'Sorted selected layers by Y position'
})
