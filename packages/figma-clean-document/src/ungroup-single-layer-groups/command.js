import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'
import { ungroupSingleLayerGroup } from './ungroup-single-layer-group'

export default commandFactory({
  callback: ungroupSingleLayerGroup,
  filterCallback: function (layer) {
    return layer.type !== 'INSTANCE'
  },
  createSuccessMessage: function (context, count) {
    return `Ungrouped ${mapNumberToWord(count)} single-layer ${pluralize(
      count,
      'group'
    )} ${context}`
  },
  createFailureMessage: function (context) {
    return `No single-layer groups ${context}`
  }
})
