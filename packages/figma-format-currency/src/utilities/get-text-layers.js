import {
  extractAttributes,
  sortLayersByName,
  traverseLayer
} from '@create-figma-plugin/utilities'

const attributes = ['id', 'characters']

export function getTextLayers () {
  const result = []
  for (const layer of figma.currentPage.selection) {
    traverseLayer(layer, async function (layer) {
      if (layer.type === 'TEXT') {
        result.push(layer)
      }
    })
  }
  return extractAttributes(sortLayersByName(result), attributes)
}
