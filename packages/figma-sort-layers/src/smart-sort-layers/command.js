import { commandFactory } from '../utilities/command-factory'
import { smartSortLayers } from './utilities/smart-sort-layers'

export default commandFactory({
  sortLayers: smartSortLayers,
  successMessage: 'Smart sorted selected layers'
})
