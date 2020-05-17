import { compareObjects, traverseNode } from '@create-figma-plugin/utilities'

export function getSimilarLayers (referenceLayer, attributes) {
  const result = []
  for (const layer of figma.currentPage.children) {
    traverseNode(layer, function (layer) {
      if (compareAttributes(attributes, referenceLayer, layer) === true) {
        result.push(layer)
      }
    })
  }
  return result
}

export function compareAttributes (attributes, a, b) {
  for (const attribute of attributes) {
    if (compareObjects(a[attribute], b[attribute]) === false) {
      return false
    }
  }
  return true
}
