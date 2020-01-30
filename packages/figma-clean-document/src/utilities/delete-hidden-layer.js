import { isLayerWithinInstance } from '@create-figma-plugin/utilities'

export function deleteHiddenLayer (layer) {
  if (layer.visible === true || isLayerWithinInstance(layer) === true) {
    return false
  }
  layer.remove()
  const selection = figma.currentPage.selection
  if (selection.indexOf(layer) !== -1) {
    // Remove `layer` from `selection`
    figma.currentPage.selection = selection.filter(function ({ id }) {
      return id !== layer.id
    })
  }
  return true
}
