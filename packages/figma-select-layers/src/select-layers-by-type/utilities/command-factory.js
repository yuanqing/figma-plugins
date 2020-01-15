import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  mapNumberToWord,
  pluralize
} from '@create-figma-plugin/utilities'

export function commandFactory (filterCallback, label) {
  return function () {
    const layers = getSelectedLayersOrAllLayers().filter(filterCallback)
    const scope =
      figma.currentPage.selection.length > 0 ? 'within selection' : 'on page'
    if (layers.length > 0) {
      figma.currentPage.selection = layers
      figma.viewport.scrollAndZoomIntoView(layers)
      figma.closePlugin(
        formatSuccessMessage(
          `Selected ${mapNumberToWord(layers.length)} ${pluralize(
            layers.length,
            label
          )} ${scope}`
        )
      )
      return
    }
    figma.closePlugin(formatErrorMessage(`No ${label}s ${scope}`))
  }
}
