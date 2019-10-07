/* global figma */
import { checkCommonParent } from 'figma-sort-layers/src/check-common-parent'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'

export function smartSortSelectedLayers () {
  const selectedLayers = figma.currentPage.selection
  if (checkCommonParent(selectedLayers) === false) {
    return false
  }
  const parentLayer = selectedLayers[0].parent
  const layerIds = collectLayerIds(selectedLayers)
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
