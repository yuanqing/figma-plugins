/* global figma */
import {
  getAllOrSelectedLayers,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { smartRenameLayer } from '../smart-rename-layer'

export default function () {
  let count = 0
  const layers = getAllOrSelectedLayers()
  for (const layer of layers) {
    traverseLayer(layer, function (layer) {
      if (layer.removed) {
        return
      }
      if (smartRenameLayer(layer)) {
        count++
      }
    })
  }
  const context =
    figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
  figma.closePlugin(
    count === 0
      ? `No layers renamed ${context}`
      : `✔ \u00a0 Smart renamed ${count} layer${
          count === 1 ? '' : 's'
        } ${context}`
  )
}
