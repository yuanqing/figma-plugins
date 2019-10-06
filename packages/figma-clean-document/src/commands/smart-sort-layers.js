/* global figma */
import { smartSortAllLayers } from '../smart-sort-all-layers'
import { smartSortSelectedLayers } from '../smart-sort-selected-layers'

export default function () {
  if (figma.currentPage.selection.length > 0) {
    if (smartSortSelectedLayers() === false) {
      figma.closePlugin('✘ \u00a0 Select layers in the same list')
      return
    }
    figma.closePlugin('✔ \u00a0 Smart sorted selected layers')
    return
  }
  smartSortAllLayers()
  figma.closePlugin('✔ \u00a0 Smart sorted layers on page')
}
