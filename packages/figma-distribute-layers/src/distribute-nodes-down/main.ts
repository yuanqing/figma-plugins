import { mainFactory } from '../utilities/main-factory.js'
import { distributeNodesDown } from './utilities/distribute-nodes-down.js'

export default mainFactory({
  direction: 'down',
  distributeNodes: distributeNodesDown,
  title: 'Distribute Layers Down'
})
