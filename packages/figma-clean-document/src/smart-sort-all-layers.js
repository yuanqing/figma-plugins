/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from './smart-sort-child-layers'

export function smartSortAllLayers () {
  traverseLayer(
    figma.currentPage,
    function (layer) {
      if (layer.removed) {
        return
      }
      smartSortChildLayers(layer)
    },
    function (layer) {
      return layer.type !== 'INSTANCE'
    }
  )
}
