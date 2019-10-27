/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'
import { isLayerAnIllustration } from './is-layer-an-illustration'

export function smartSortAllLayers () {
  let didChange = false
  traverseLayer(
    figma.currentPage,
    function (layer) {
      const result = smartSortChildLayers(layer)
      if (result !== null) {
        didChange = true
        updateLayersSortOrder(result)
      }
    },
    function (layer) {
      return layer.type !== 'INSTANCE' && isLayerAnIllustration(layer) === false
    }
  )
  return didChange
}
