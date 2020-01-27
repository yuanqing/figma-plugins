import {
  formatErrorMessage,
  formatSuccessMessage,
  groupSiblingLayers,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'

export function commandFactory ({ sortLayers, successMessage }) {
  return function () {
    const selection = figma.currentPage.selection
    if (
      selection.length === 0 ||
      (selection.length === 1 &&
        typeof selection[0].children !== 'undefined' &&
        selection[0].children.length < 2)
    ) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
    const groups =
      selection.length === 1
        ? [selection[0].children.slice().reverse()]
        : groupSiblingLayers(selection)
    let didChange = false
    for (const layers of groups) {
      const result = sortLayers(layers)
      if (result !== null) {
        didChange = updateLayersSortOrder(result) || didChange
      }
    }
    figma.closePlugin(
      didChange === true
        ? formatSuccessMessage(successMessage)
        : 'No change to sort order'
    )
  }
}
