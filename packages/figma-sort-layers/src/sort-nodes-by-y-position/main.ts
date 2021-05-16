import { mainFactory } from '../utilities/main-factory.js'
import { sortNodesByYPosition } from './utilities/sort-nodes-by-y-position.js'

export default mainFactory({
  sortNodes: sortNodesByYPosition,
  successMessage: 'Sorted selected layers by Y position'
})
