import { mainFactory } from '../utilities/main-factory'
import { smartSortNodes } from './utilities/smart-sort-nodes'

export default mainFactory({
  sortNodes: smartSortNodes,
  successMessage: 'Smart sorted selected layers'
})
