import {
  extractAttributes,
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
  return extractAttributes(sortLayers(result), attributes)
}

function sortLayers (layers) {
  return layers.slice().sort(function (a, b) {
    if (a.y !== b.y) {
      return a.y - b.y
    }
    if (a.x !== b.x) {
      return a.x - b.x
    }
    return a.name.localeCompare(b.name, { numeric: true })
  })
}
