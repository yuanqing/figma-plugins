import {
  areSiblingLayers,
  sortSiblingLayersByLayerListOrder
} from '@create-figma-plugin/utilities'

export function createGroup (layers) {
  if (areSiblingLayers(layers) === false) {
    // Create a group containing `layers`, and insert the group as a child of
    // the current page.
    return figma.group(layers, figma.currentPage)
  }

  // Get the parent layer of `layers`.
  const parent = layers[0].parent

  // Get the top-most layer in `layers`, and compute the index of this top-most
  // layer within `parent`.
  const topMostLayer = sortSiblingLayersByLayerListOrder(layers)[0]
  const index = parent.children.indexOf(topMostLayer)

  // Create a group layer containing `layers`, and insert the group
  // as a child of `parent`.
  return figma.group(layers, parent, index)
}
