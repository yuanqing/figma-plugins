import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { ungroupSingleLayerGroup } from '../utilities/ungroup-single-layer-group'

export default commandFactory({
  processLayer: ungroupSingleLayerGroup,
  filterCallback: function (layer) {
    return layer.type !== 'INSTANCE'
  },
  createLoadingMessage: function () {
    return 'Ungrouping single-layer groups…'
  },
  createSuccessMessage: function (scope, count) {
    return `Ungrouped ${mapNumberToWord(count)} single-layer ${pluralize(
      count,
      'group'
    )} ${scope}`
  },
  createFailureMessage: function (scope) {
    return `No single-layer groups ${scope}`
  }
})
