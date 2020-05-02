import { sortLayersByName } from '@create-figma-plugin/utilities'
import { mainFactory } from '../utilities/main-factory'

export default mainFactory({
  sortLayers: sortLayersByName,
  successMessage: 'Sorted selected layers by name'
})
