import { mainFactory } from '../utilities/main-factory.js'
import { reverseNodesSortOrder } from './utilities/reverse-nodes-sort-order.js'

export default mainFactory({
  sortNodes: reverseNodesSortOrder,
  successMessage: 'Reversed layer sort order'
})
