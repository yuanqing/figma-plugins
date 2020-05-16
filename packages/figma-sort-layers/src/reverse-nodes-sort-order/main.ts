import { mainFactory } from '../utilities/main-factory'
import { reverseNodesSortOrder } from './utilities/reverse-nodes-sort-order'

export default mainFactory({
  sortNodes: reverseNodesSortOrder,
  successMessage: 'Reversed layer sort order'
})
