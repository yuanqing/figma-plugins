import { mainFactory } from '../utilities/main-factory.js'
import { sortNodesByXPosition } from './utilities/sort-nodes-by-x-position.js'

export default mainFactory({
  sortNodes: sortNodesByXPosition,
  successMessage: 'Sorted selected layers by X position'
})
