/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'

export function filterLayersByName (layerName, exactMatch) {
  if (layerName === '') {
    return []
  }
  const regex = new RegExp(layerName, 'i')
  const result = []
  traverseLayer(figma.currentPage, function (layer) {
    const matches = layer.name.match(regex)
    if (matches !== null) {
      if (exactMatch === true && layer.name !== matches[0]) {
        return
      }
      result.push(layer)
    }
  })
  return result
}
