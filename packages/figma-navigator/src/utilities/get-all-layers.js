/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'

export function getAllLayers () {
  const result = {}
  for (const layer of figma.currentPage.children) {
    traverseLayer(
      layer,
      function (layer) {
        const { type, id } = layer
        if (
          (type === 'COMPONENT' || type === 'FRAME') &&
          typeof result[id] === 'undefined'
        ) {
          result[id] = layer
        }
      },
      function ({ type }) {
        return type === 'FRAME' || type === 'GROUP' || type === 'COMPONENT'
      }
    )
  }
  return Object.values(result)
}
