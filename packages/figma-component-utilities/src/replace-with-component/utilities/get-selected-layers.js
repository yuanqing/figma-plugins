import { extractAttributes } from '@create-figma-plugin/utilities'
import { isLayerWithinInstance } from '../../is-layer-within-instance'

export function getSelectedLayers () {
  const layers = figma.currentPage.selection.filter(function (layer) {
    return isLayerWithinInstance(layer) === false
  })
  return extractAttributes(layers, ['id', 'name'])
}
