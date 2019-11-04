/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'

export function getTextLayers () {
  const selection = figma.currentPage.selection
  return filterLayers(
    selection.length === 0 ? [figma.currentPage] : selection,
    function (layer) {
      return layer.type === 'TEXT'
    }
  )
}

function filterLayers (layers, filter) {
  const result = []
  for (const layer of layers) {
    traverseLayer(layer, async function (layer) {
      if (filter(layer) === true) {
        result.push(layer)
      }
    })
  }
  return result
}
