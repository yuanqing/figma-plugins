import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { deleteHiddenLayer } from '../utilities/delete-hidden-layer'

export default commandFactory({
  processLayer: deleteHiddenLayer,
  stopTraversal: function (layer) {
    return layer.type === 'INSTANCE'
  },
  createLoadingMessage: function (scope) {
    return `Deleting hidden layers ${scope}…`
  },
  createSuccessMessage: function (scope, count) {
    return `Deleted ${mapNumberToWord(count)} hidden ${pluralize(
      count,
      'layer'
    )} ${scope}`
  },
  createFailureMessage: function (scope) {
    return `No hidden layers ${scope}`
  }
})
