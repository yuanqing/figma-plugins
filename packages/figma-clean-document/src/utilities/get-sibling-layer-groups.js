import { computeSiblingLayers } from '@create-figma-plugin/utilities'

// Returns an array of array of sibling layers.
export function getSiblingLayerGroups () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    return [figma.currentPage.children.slice().reverse()]
  }
  if (selection.length === 1 && typeof selection[0].children !== 'undefined') {
    return computeSiblingLayers([selection[0], ...selection[0].children])
  }
  return computeSiblingLayers(selection)
}
