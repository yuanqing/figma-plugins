import {
  extractAttributes,
  isLayerWithinInstance
} from '@create-figma-plugin/utilities'

export function getSelectedLayers () {
  const layers = figma.currentPage.selection.filter(function (layer) {
    return isLayerWithinInstance(layer) === false
  })
  return extractAttributes(layers, ['id', 'name'])
}
