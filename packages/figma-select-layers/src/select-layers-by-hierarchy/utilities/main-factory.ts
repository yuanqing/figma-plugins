import {
  deduplicateNodes,
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

export function mainFactory(label, getLayersCallback) {
  return function () {
    if (figma.currentPage.children.length === 0) {
      figma.closePlugin(formatErrorMessage('No layers on page'))
      return
    }
    const scope =
      figma.currentPage.selection.length > 0 ? 'within selection' : 'on page'
    const layers = deduplicateNodes(
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
        `Selected ${layers.length} ${pluralize(layers.length, label)}`
      )
    )
  }
}
