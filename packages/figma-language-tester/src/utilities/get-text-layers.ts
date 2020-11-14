import { traverseNode } from '@create-figma-plugin/utilities'

export function getTextLayers() {
  const selection = figma.currentPage.selection
  const hasSelection = selection.length > 0
  return {
    layers: filterLayers(
      hasSelection ? selection.slice() : figma.currentPage.children.slice(),
      function (layer: SceneNode) {
        return layer.type === 'TEXT'
      }
    ),
    scope: hasSelection ? 'in selection' : 'on page'
  }
}

function filterLayers(
  layers: Array<SceneNode>,
  filter: (layer: SceneNode) => boolean
) {
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
