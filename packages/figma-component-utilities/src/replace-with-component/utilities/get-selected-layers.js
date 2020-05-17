import {
  extractAttributes,
  isWithinInstance
} from '@create-figma-plugin/utilities'

export function getSelectedLayers () {
  const layers = figma.currentPage.selection.filter(function (layer) {
    return isWithinInstance(layer) === false
  })
  return extractAttributes(layers, ['id', 'name'])
}
