/* global figma */
import { checkCommonParent } from 'figma-sort-layers/src/check-common-parent'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'

export function smartSortSelectedLayers () {
  let childLayers = figma.currentPage.selection
  let parentLayer = childLayers[0].parent
  if (childLayers.length === 1) {
    parentLayer = childLayers[0]
    childLayers = childLayers[0].children
  } else {
    if (checkCommonParent(childLayers) === false) {
      return false
    }
  }
  const layerIds = collectLayerIds(childLayers)
  const result = smartSortChildLayers(parentLayer, layerIds)
  if (result !== null) {
    updateLayersSortOrder(result)
  }
  return true
}

function collectLayerIds (layers) {
  const result = []
  for (const layer of layers) {
    result.push(layer.id)
  }
  return result
}
