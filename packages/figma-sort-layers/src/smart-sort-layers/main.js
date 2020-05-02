import { mainFactory } from '../utilities/main-factory'
import { smartSortLayers } from './utilities/smart-sort-layers'

export default mainFactory({
  sortLayers: smartSortLayers,
  successMessage: 'Smart sorted selected layers'
})
