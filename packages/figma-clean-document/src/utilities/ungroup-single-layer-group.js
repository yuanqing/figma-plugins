import { isLayerWithinInstance } from '@create-figma-plugin/utilities'

export function ungroupSingleLayerGroup (layer) {
  if (
    isSingleLayerGroup(layer) === false ||
    isLayerWithinInstance(layer) === true
  ) {
    return false
  }
  const parentLayer = layer.parent
  const index = parentLayer.children.indexOf(layer)
  const childLayer = layer.children[0]
  const selection = figma.currentPage.selection
  if (selection.indexOf(layer) !== -1) {
    // Replace the removed `layer` in `selection` with the `childLayer`
    const newSelection = selection.filter(function ({ id }) {
      return id !== layer.id
    })
    newSelection.push(childLayer)
    figma.currentPage.selection = newSelection
  }
  parentLayer.insertChild(index, childLayer)
  return true
}

function isSingleLayerGroup (layer) {
  return (
    layer.type === 'GROUP' &&
    layer.children.length === 1 &&
    layer.backgrounds.length === 0 &&
    layer.blendMode === 'PASS_THROUGH' &&
    typeof layer.constraints === 'undefined' &&
    layer.effects.length === 0 &&
    layer.exportSettings.length === 0
  )
}
