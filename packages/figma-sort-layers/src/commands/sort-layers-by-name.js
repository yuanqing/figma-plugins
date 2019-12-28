import { sortLayersByName } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  sortLayers: sortLayersByName,
  successMessage: 'Sorted selected layers by name'
})
