import { mainFactory } from '../utilities/main-factory'
import { sortLayersByXPosition } from './utilities/sort-layers-by-x-position'

export default mainFactory({
  sortLayers: sortLayersByXPosition,
  successMessage: 'Sorted selected layers by X position'
})
