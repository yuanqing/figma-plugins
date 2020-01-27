import { sortLayersByName } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'

export default commandFactory({
  sortLayers: sortLayersByName,
  successMessage: 'Sorted selected layers by name'
})
