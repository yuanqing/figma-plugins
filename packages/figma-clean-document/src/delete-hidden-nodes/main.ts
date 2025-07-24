import { pluralize } from '@create-figma-plugin/utilities'

import { deleteHiddenNodes } from '../utilities/delete-hidden-nodes.js'
import { mainFactory } from '../utilities/main-factory.js'

export default mainFactory({
  createFailureMessage: function (scope: string) {
    return `No hidden layers ${scope}`
  },
  createLoadingMessage: function (scope: string) {
    return `Deleting hidden layers ${scope}…`
  },
  createSuccessMessage: function (scope: string, count: number) {
    return `Deleted ${count} hidden ${pluralize(count, 'layer')} ${scope}`
  },
  processNodeAsync: async function (node: SceneNode) {
    return deleteHiddenNodes(node)
  },
  stopTraversal: function (node: SceneNode) {
    return node.type === 'INSTANCE'
  }
})
