import { mainFactory } from '../utilities/main-factory.js'
import { distributeNodesLeft } from './utilities/distribute-nodes-left.js'

export default mainFactory({
  direction: 'left',
  distributeNodes: distributeNodesLeft
})
