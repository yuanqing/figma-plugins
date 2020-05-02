import { pluralize } from '@create-figma-plugin/utilities'
import { deleteHiddenLayer } from '../utilities/delete-hidden-layer'
import { mainFactory } from '../utilities/main-factory'

export default mainFactory({
  processLayer: deleteHiddenLayer,
  stopTraversal: function (layer) {
    return layer.type === 'INSTANCE'
  },
  createLoadingMessage: function (scope) {
    return `Deleting hidden layers ${scope}…`
  },
  createSuccessMessage: function (scope, count) {
    return `Deleted ${count} hidden ${pluralize(count, 'layer')} ${scope}`
  },
  createFailureMessage: function (scope) {
    return `No hidden layers ${scope}`
  }
})
