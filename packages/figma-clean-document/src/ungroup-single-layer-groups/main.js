import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { mainFactory } from '../utilities/main-factory'
import { ungroupSingleLayerGroup } from '../utilities/ungroup-single-layer-group'

export default mainFactory({
  processLayer: ungroupSingleLayerGroup,
  stopTraversal: function (layer) {
    return layer.type === 'INSTANCE'
  },
  createLoadingMessage: function a (scope) {
    return `Ungrouping single-layer groups ${scope}…`
  },
  createSuccessMessage: function b (scope, count) {
    return `Ungrouped ${mapNumberToWord(count)} single-layer ${pluralize(
      count,
      'group'
    )} ${scope}`
  },
  createFailureMessage: function c (scope) {
    return `No single-layer groups ${scope}`
  }
})
