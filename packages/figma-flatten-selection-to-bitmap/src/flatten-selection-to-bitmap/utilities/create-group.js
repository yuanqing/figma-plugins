import {
  areSiblingLayers,
  sortSiblingLayersByLayerListOrder
} from '@create-figma-plugin/utilities'

export function createGroup (layers) {
  if (areSiblingLayers(layers) === false) {
    return figma.group(layers, figma.currentPage)
  }
  const parent = layers[0].parent
  const topMostLayer = sortSiblingLayersByLayerListOrder(layers)[0]
  const index = parent.children.indexOf(topMostLayer)
  return figma.group(layers, parent, index)
}
