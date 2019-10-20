import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'
import { ungroupSingleLayerGroup } from './ungroup-single-layer-group'

export default commandFactory({
  callback: ungroupSingleLayerGroup,
  createSuccessMessage: function (count) {
    return `Ungrouped ${mapNumberToWord(count)} single-layer ${pluralize(
      count,
      'group'
    )}`
  },
  createFailureMessage: function () {
    return 'No single-layer groups'
  }
})
