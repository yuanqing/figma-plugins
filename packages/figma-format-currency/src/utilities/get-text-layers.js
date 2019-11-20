/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'

export function getTextLayers () {
  const result = []
  for (const layer of figma.currentPage.selection) {
    traverseLayer(layer, async function (layer) {
      if (layer.type === 'TEXT') {
        result.push(layer)
      }
    })
  }
  return result
}
