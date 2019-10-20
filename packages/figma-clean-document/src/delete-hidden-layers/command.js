import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'
import { deleteHiddenLayer } from './delete-hidden-layer'

export default commandFactory({
  callback: deleteHiddenLayer,
  createSuccessMessage: function (context, count) {
    return `Deleted ${mapNumberToWord(count)} hidden ${pluralize(
      count,
      'layer'
    )} ${context}`
  },
  createFailureMessage: function (context) {
    return `No hidden layers ${context}`
  }
})
