import { mainFactory } from '../utilities/main-factory'
import { sortNodesByXPosition } from './utilities/sort-nodes-by-x-position'

export default mainFactory({
  sortNodes: sortNodesByXPosition,
  successMessage: 'Sorted selected layers by X position'
})
