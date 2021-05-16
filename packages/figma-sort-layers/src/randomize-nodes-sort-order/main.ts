import { mainFactory } from '../utilities/main-factory.js'
import { randomizeNodesSortOrder } from './utilities/randomize-nodes-sort-order.js'

export default mainFactory({
  sortNodes: randomizeNodesSortOrder,
  successMessage: 'Randomized layer sort order'
})
