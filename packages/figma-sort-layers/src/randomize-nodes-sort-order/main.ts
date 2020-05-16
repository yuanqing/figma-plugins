import { mainFactory } from '../utilities/main-factory'
import { randomizeNodesSortOrder } from './utilities/randomize-nodes-sort-order'

export default mainFactory({
  sortNodes: randomizeNodesSortOrder,
  successMessage: 'Randomized layer sort order'
})
