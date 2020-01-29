import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { makePixelPerfect } from '../utilities/make-pixel-perfect'

export default commandFactory({
  processLayer: makePixelPerfect,
  stopTraversal: function (layer) {
    return layer.type === 'INSTANCE' || layer.type === 'BOOLEAN_OPERATION'
  },
  createLoadingMessage: function (scope) {
    return `Making layers ${scope} pixel-perfect…`
  },
  createSuccessMessage: function (scope, count) {
    return `Made ${mapNumberToWord(count)} ${pluralize(
      count,
      'layer'
    )} ${scope} pixel-perfect`
  },
  createFailureMessage: function (scope) {
    return `No change to layers ${scope}`
  }
})
