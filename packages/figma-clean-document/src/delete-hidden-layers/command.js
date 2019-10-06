/* global figma */
import {
  getAllOrSelectedLayers,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { deleteHiddenLayer } from './delete-hidden-layer'

export default function () {
  let count = 0
  const layers = getAllOrSelectedLayers()
  for (const layer of layers) {
    traverseLayer(layer, function (layer) {
      if (layer.removed) {
        return
      }
      if (deleteHiddenLayer(layer)) {
        count++
      }
    })
  }
  const context =
    figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
  figma.closePlugin(
    count === 0
      ? `No hidden layers ${context}`
      : `✔ \u00a0 Deleted ${count} hidden layer${
          count === 1 ? '' : 's'
        } ${context}`
  )
}
