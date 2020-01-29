import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { ungroupSingleLayerGroup } from '../utilities/ungroup-single-layer-group'

export default commandFactory({
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
