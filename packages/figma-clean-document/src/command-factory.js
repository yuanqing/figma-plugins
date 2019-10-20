/* global figma */
import {
  formatSuccessMessage,
  getAllOrSelectedLayers,
  traverseLayer
} from '@create-figma-plugin/utilities'

export function commandFactory ({
  callback,
  createSuccessMessage,
  createFailureMessage
}) {
  return function () {
    let count = 0
    const layers = getAllOrSelectedLayers()
    for (const layer of layers) {
      traverseLayer(layer, function (layer) {
        if (layer.removed === true) {
          return
        }
        if (callback(layer) === true) {
          count++
        }
      })
    }
    const context =
      figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
    figma.closePlugin(
      `${
        count > 0
          ? formatSuccessMessage(createSuccessMessage(context, count))
          : createFailureMessage(context)
      }`
    )
  }
}
