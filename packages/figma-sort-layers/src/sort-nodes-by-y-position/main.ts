import { mainFactory } from '../utilities/main-factory'
import { sortNodesByYPosition } from './utilities/sort-nodes-by-y-position'

export default mainFactory({
  sortNodes: sortNodesByYPosition,
  successMessage: 'Sorted selected layers by Y position'
})
