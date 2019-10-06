import { commandFactory } from '../command-factory'
import { sortLayersByName } from './sort-layers-by-name'

export default commandFactory({
  sortLayers: sortLayersByName,
  successMessage: 'Sorted selected layers by name'
})
