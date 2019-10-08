/* global figma */
import {
  formatSuccessMessage,
  getAllOrSelectedLayers,
  mapNumberToWord,
  pluralize,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { smartRenameLayer } from './smart-rename-layer'

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
  /* eslint-disable indent */
  figma.closePlugin(
    count === 0
      ? `No layers renamed ${context}`
      : formatSuccessMessage(
          `Smart renamed ${mapNumberToWord(count)} ${pluralize(
            count,
            'layer'
          )} ${context}`
        )
  )
  /* eslint-enable indent */
}
