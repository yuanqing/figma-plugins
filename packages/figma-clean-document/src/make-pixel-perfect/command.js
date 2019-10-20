import { mapNumberToWord, pluralize } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'
import { makePixelPerfect } from './make-pixel-perfect'

export default commandFactory({
  callback: makePixelPerfect,
  createSuccessMessage: function (context, count) {
    return `Made ${mapNumberToWord(count)} ${pluralize(
      count,
      'layer'
    )} ${context} pixel-perfect`
  },
  createFailureMessage: function (context) {
    return `All layers ${context} already pixel-perfect`
  }
})
