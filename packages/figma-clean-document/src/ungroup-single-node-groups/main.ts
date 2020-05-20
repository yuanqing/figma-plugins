import { pluralize } from '@create-figma-plugin/utilities'

import { mainFactory } from '../utilities/main-factory'
import { ungroupSingleNodeGroup } from '../utilities/ungroup-single-node-group'

export default mainFactory({
  processNode: ungroupSingleNodeGroup,
  stopTraversal: function (node: SceneNode) {
    return node.type === 'INSTANCE'
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
  createFailureMessage: function (scope: string) {
    return `No single-layer groups ${scope}`
  }
})
