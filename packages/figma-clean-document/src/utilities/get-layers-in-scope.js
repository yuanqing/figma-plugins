import { groupSiblingLayers } from '@create-figma-plugin/utilities'

export function getLayersInScope () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    return groupSiblingLayers(figma.currentPage.children)
  }
  if (selection.length === 1 && typeof selection[0].children !== 'undefined') {
    return groupSiblingLayers([selection[0], ...selection[0].children])
  }
  return groupSiblingLayers(selection)
}
