import { commandFactory } from '../utilities/command-factory'
import { sortLayersByXPosition } from './utilities/sort-layers-by-x-position'

export default commandFactory({
  sortLayers: sortLayersByXPosition,
  successMessage: 'Sorted selected layers by X position'
})
