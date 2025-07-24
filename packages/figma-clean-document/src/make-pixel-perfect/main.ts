import { pluralize } from '@create-figma-plugin/utilities'

import { mainFactory } from '../utilities/main-factory.js'
import { makePixelPerfect } from '../utilities/make-pixel-perfect.js'

export default mainFactory({
  createFailureMessage: function (scope: string) {
    return `No change to layers ${scope}`
  },
  createLoadingMessage: function (scope: string) {
    return `Making layers ${scope} pixel-perfect…`
  },
  createSuccessMessage: function (scope: string, count: number) {
    return `Made ${count} ${pluralize(count, 'layer')} ${scope} pixel-perfect`
  },
  processNodeAsync: async function (node: SceneNode) {
    return makePixelPerfect(node)
  },
  stopTraversal: function (node: SceneNode) {
    return node.type === 'INSTANCE' || node.type === 'BOOLEAN_OPERATION'
  }
})
