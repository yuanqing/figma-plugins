/* global figma */
import {
  formatSuccessMessage,
  getAllOrSelectedLayers,
  mapNumberToWord,
  pluralize,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { ungroupSingleLayerGroup } from './ungroup-single-layer-group'

export default function () {
  let count = 0
  const layers = getAllOrSelectedLayers()
  for (const layer of layers) {
    traverseLayer(layer, function (layer) {
      if (layer.removed === true) {
        return
      }
      if (ungroupSingleLayerGroup(layer) === true) {
        count++
      }
    })
  }
  const context =
    figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
  /* eslint-disable indent */
  figma.closePlugin(
    count === 0
      ? `No single-layer groups ${context}`
      : formatSuccessMessage(
          `Ungrouped ${mapNumberToWord(count)} single-layer ${pluralize(
            count,
            'group'
          )} ${context}`
        )
  )
  /* eslint-enable indent */
}
