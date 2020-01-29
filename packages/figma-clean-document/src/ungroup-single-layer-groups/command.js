import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { smartSortLayers } from '../utilities/smart-sort-layers'

export default commandFactory({
  processLayer: smartSortLayers,
  createLoadingMessage: function (scope) {
    return `Ungrouping single-layer groups ${scope}…`
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
