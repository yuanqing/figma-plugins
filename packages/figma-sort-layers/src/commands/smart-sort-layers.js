import { commandFactory } from '../command-factory'
import { smartSortSelectedLayers } from '../smart-sort-selected-layers'

export default commandFactory({
  sortLayers: smartSortSelectedLayers,
  successMessage: 'Smart sorted selected layers'
})
