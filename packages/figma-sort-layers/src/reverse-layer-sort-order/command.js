import { commandFactory } from '../utilities/command-factory'
import { reverseLayerSortOrder } from './utilities/reverse-layer-sort-order'

export default commandFactory({
  sortLayers: reverseLayerSortOrder,
  successMessage: 'Reversed layer sort order'
})
