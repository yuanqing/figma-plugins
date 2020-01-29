import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { makePixelPerfect } from '../utilities/make-pixel-perfect'

export default commandFactory({
  processLayer: makePixelPerfect,
  filterCallback: function (layer) {
    return layer.type !== 'INSTANCE' && layer.type !== 'VECTOR'
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
    return `All layers ${scope} already pixel-perfect`
  }
})
