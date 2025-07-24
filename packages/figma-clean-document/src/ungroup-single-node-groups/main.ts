import { pluralize } from '@create-figma-plugin/utilities'

import { mainFactory } from '../utilities/main-factory.js'
import { ungroupSingleNodeGroup } from '../utilities/ungroup-single-node-group.js'

export default mainFactory({
  createFailureMessage: function (scope: string) {
    return `No single-layer groups ${scope}`
  },
  createLoadingMessage: function (scope: string) {
    return `Ungrouping single-layer groups ${scope}…`
  },
  createSuccessMessage: function (scope: string, count: number) {
    return `Ungrouped ${count} single-layer ${pluralize(
      count,
      'group'
    )} ${scope}`
  },
  processNodeAsync: async function (node: SceneNode) {
    return ungroupSingleNodeGroup(node)
  },
  stopTraversal: function (node: SceneNode) {
    return node.type === 'INSTANCE'
  }
})
