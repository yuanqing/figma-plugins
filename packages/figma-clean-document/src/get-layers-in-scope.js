/* global figma */
import { groupSiblingLayers } from 'figma-sort-layers/src/group-sibling-layers'

export function getLayersInScope () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    return [figma.currentPage.children]
  }
  return selection.length === 1
    ? [selection[0].children]
    : groupSiblingLayers(selection)
}
