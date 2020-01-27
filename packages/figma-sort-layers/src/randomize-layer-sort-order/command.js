import { commandFactory } from '../utilities/command-factory'
import { randomizeLayerSortOrder } from './utilities/randomize-layer-sort-order'

export default commandFactory({
  sortLayers: randomizeLayerSortOrder,
  successMessage: 'Randomized layer sort order'
})
