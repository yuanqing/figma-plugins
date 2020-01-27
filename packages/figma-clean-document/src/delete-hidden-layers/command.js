import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { deleteHiddenLayer } from '../utilities/delete-hidden-layer'

export default commandFactory({
  processLayer: deleteHiddenLayer,
  filterCallback: function (layer) {
    return layer.type !== 'COMPONENT' && layer.type !== 'INSTANCE'
  },
  createLoadingMessage: function () {
    return 'Deleting hidden layers…'
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
