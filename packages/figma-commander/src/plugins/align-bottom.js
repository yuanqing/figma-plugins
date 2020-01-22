import { setAbsolutePosition } from '@create-figma-plugin/utilities'

export const alignBottom = {
  shorthand: 'bb',
  argumentTypes: [],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    return [
      {
        label: 'Align layers bottom',
        isDisabled
      }
    ]
  },
  command: function () {
    const selectedLayers = figma.currentPage.selection
    const bottom = getBottomPosition(selectedLayers)
    for (const layer of selectedLayers) {
      setAbsolutePosition(layer, { y: bottom - layer.height })
    }
    return { successMessage: 'Aligned layers bottom' }
  }
}

function getBottomPosition (layers) {
  let result = -1 * Number.MAX_VALUE
  for (const layer of layers) {
    const bottom = layer.absoluteTransform[1][2] + layer.height
    if (bottom > result) {
      result = bottom
    }
  }
  return result
}
