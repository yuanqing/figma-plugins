import { mainFactory } from '../utilities/main-factory.js'
import { smartSortNodes } from './utilities/smart-sort-nodes.js'

export default mainFactory({
  sortNodes: smartSortNodes,
  successMessage: 'Smart sorted selected layers'
})
