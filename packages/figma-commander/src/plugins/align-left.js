import { setAbsolutePosition } from '@create-figma-plugin/utilities'

export const alignLeft = {
  shorthand: 'll',
  argumentTypes: [],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    return [
      {
        label: 'Align layers left',
        isDisabled
      }
    ]
  },
  command: function () {
    const selectedLayers = figma.currentPage.selection
    const left = getLeftPosition(selectedLayers)
    for (const layer of selectedLayers) {
      setAbsolutePosition(layer, { x: left })
    }
    return { successMessage: 'Aligned layers left' }
  }
}

function getLeftPosition (layers) {
  let result = Number.MAX_VALUE
  for (const layer of layers) {
    const left = layer.absoluteTransform[0][2]
    if (left < result) {
      result = left
    }
  }
  return result
}
