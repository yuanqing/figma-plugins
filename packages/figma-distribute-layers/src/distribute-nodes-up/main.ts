import { mainFactory } from '../utilities/main-factory'
import { distributeNodesUp } from './utilities/distribute-nodes-up'

export default mainFactory({
  direction: 'up',
  distributeNodes: distributeNodesUp
})
