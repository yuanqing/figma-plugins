import { mainFactory } from '../utilities/main-factory'
import { randomizeLayerSortOrder } from './utilities/randomize-layer-sort-order'

export default mainFactory({
  sortLayers: randomizeLayerSortOrder,
  successMessage: 'Randomized layer sort order'
})
