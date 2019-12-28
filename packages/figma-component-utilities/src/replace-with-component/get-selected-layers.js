import { extractLayerAttributes } from '@create-figma-plugin/utilities'
import { isLayerWithinInstance } from '../utilities/is-layer-within-instance'

export function getSelectedLayers () {
  const layers = figma.currentPage.selection.filter(function (layer) {
    return isLayerWithinInstance(layer) === false
  })
  return extractLayerAttributes(layers, ['id', 'name'])
}
