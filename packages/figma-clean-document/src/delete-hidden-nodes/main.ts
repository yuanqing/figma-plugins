import { pluralize } from '@create-figma-plugin/utilities'

import { deleteHiddenNodes } from '../utilities/delete-hidden-nodes'
import { mainFactory } from '../utilities/main-factory'

export default mainFactory({
  processNode: deleteHiddenNodes,
  stopTraversal: function (node: SceneNode) {
    return node.type === 'INSTANCE'
  },
  createLoadingMessage: function (scope: string) {
    return `Deleting hidden layers ${scope}…`
  },
  createSuccessMessage: function (scope: string, count: number) {
    return `Deleted ${count} hidden ${pluralize(count, 'layer')} ${scope}`
  },
  createFailureMessage: function (scope: string) {
    return `No hidden layers ${scope}`
  }
})
