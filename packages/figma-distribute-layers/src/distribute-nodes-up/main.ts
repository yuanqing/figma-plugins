import { mainFactory } from '../utilities/main-factory.js'
import { distributeNodesUp } from './utilities/distribute-nodes-up.js'

export default mainFactory({
  direction: 'up',
  distributeNodes: distributeNodesUp
})
