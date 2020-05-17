import { traverseNode } from '@create-figma-plugin/utilities'

export function getTextLayers () {
  const selection = figma.currentPage.selection
  const hasSelection = selection.length > 0
  return {
    layers: filterLayers(
      hasSelection ? selection : [figma.currentPage],
      function (layer) {
        return layer.type === 'TEXT'
      }
    ),
    scope: hasSelection ? 'in selection' : 'on page'
  }
}

function filterLayers (layers, filter) {
  const result = []
  for (const layer of layers) {
    traverseNode(layer, async function (layer) {
      if (filter(layer) === true) {
        result.push(layer)
      }
    })
  }
  return result
}
