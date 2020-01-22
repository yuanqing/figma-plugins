import { setAbsolutePosition } from '@create-figma-plugin/utilities'

export const alignTop = {
  shorthand: 'tt',
  argumentTypes: [],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    return [
      {
        label: 'Align layers top',
        isDisabled
      }
    ]
  },
  command: function () {
    const selectedLayers = figma.currentPage.selection
    const top = getTopPosition(selectedLayers)
    for (const layer of selectedLayers) {
      setAbsolutePosition(layer, { y: top })
    }
    return { successMessage: 'Aligned layers top' }
  }
}

function getTopPosition (layers) {
  let result = Number.MAX_VALUE
  for (const layer of layers) {
    const top = layer.absoluteTransform[1][2]
    if (top < result) {
      result = top
    }
  }
  return result
}
