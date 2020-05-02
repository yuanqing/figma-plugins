import { mainFactory } from '../utilities/main-factory'
import { reverseLayerSortOrder } from './utilities/reverse-layer-sort-order'

export default mainFactory({
  sortLayers: reverseLayerSortOrder,
  successMessage: 'Reversed layer sort order'
})
