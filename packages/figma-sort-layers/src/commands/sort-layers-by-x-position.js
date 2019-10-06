import { commandFactory } from '../command-factory'
import { sortLayersByXPosition } from '../sort-layers-by-x-position'

export default commandFactory({
  sortLayers: sortLayersByXPosition,
  successMessage: 'Sorted selected layers by X position'
})
