import {
  formatErrorMessage,
  formatSuccessMessage,
  mapNumberToWord,
  pluralize,
  removeDuplicateLayers
} from '@create-figma-plugin/utilities'

export function commandFactory (label, getLayersCallback) {
  return function () {
    if (figma.currentPage.children.length === 0) {
      figma.closePlugin(formatErrorMessage('No layers on page'))
      return
    }
    const scope =
      figma.currentPage.selection.length > 0 ? 'within selection' : 'on page'
    const layers = removeDuplicateLayers(
      getLayersCallback(figma.currentPage.selection)
    )
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No ${label}s ${scope}`))
      return
    }
    figma.currentPage.selection = layers
    figma.viewport.scrollAndZoomIntoView(layers)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${mapNumberToWord(layers.length)} ${pluralize(
          layers.length,
          label
        )}`
      )
    )
  }
}
