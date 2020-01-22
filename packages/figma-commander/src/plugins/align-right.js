import { setAbsolutePosition } from '@create-figma-plugin/utilities'

export const alignRight = {
  shorthand: 'rr',
  argumentTypes: [],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    return [
      {
        label: 'Align layers right',
        isDisabled
      }
    ]
  },
  command: function () {
    const selectedLayers = figma.currentPage.selection
    const right = getRightPosition(selectedLayers)
    for (const layer of selectedLayers) {
      setAbsolutePosition(layer, { x: right - layer.width })
    }
    return { successMessage: 'Aligned layers right' }
  }
}

function getRightPosition (layers) {
  let result = -1 * Number.MAX_VALUE
  for (const layer of layers) {
    const right = layer.absoluteTransform[0][2] + layer.width
    if (right > result) {
      result = right
    }
  }
  return result
}
