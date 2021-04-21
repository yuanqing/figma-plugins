import { mainFactory } from '../utilities/main-factory'
import { distributeNodesRight } from './utilities/distribute-nodes-right'

export default mainFactory({
  direction: 'right',
  distributeNodes: distributeNodesRight
})
