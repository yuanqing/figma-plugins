import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'
import { makePixelPerfect } from './make-pixel-perfect'

export default commandFactory({
  callback: makePixelPerfect,
  filter: function (layer) {
    return layer.type !== 'INSTANCE' && layer.type !== 'VECTOR'
  },
  createLoadingMessage: function () {
    return 'Making layers pixel-perfect…'
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
