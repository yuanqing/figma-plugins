/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'

export function smartSortAllLayers () {
  traverseLayer(
    figma.currentPage,
    function (layer) {
      if (layer.removed) {
        return
      }
      const result = smartSortChildLayers(layer)
      if (result !== null) {
        updateLayersSortOrder(result)
      }
    },
    function (layer) {
      return layer.type !== 'INSTANCE'
    }
  )
}
