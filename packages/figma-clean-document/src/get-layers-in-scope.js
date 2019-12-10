/* global figma */
import { groupSiblingLayers } from '@create-figma-plugin/utilities'

export function getLayersInScope () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    return [figma.currentPage.children]
  }
  return selection.length === 1
    ? [[selection[0]], selection[0].children].filter(Boolean)
    : groupSiblingLayers(selection)
}
