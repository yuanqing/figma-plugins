import { mainFactory } from '../utilities/main-factory'
import { distributeNodesLeft } from './utilities/distribute-nodes-left'

export default mainFactory({
  direction: 'left',
  distributeNodes: distributeNodesLeft
})
