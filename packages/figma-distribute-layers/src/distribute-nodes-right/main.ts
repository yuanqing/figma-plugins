import { mainFactory } from '../utilities/main-factory.js'
import { distributeNodesRight } from './utilities/distribute-nodes-right.js'

export default mainFactory({
  direction: 'right',
  distributeNodes: distributeNodesRight
})
