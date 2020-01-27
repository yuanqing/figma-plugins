import {
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  traverseLayer
} from '@create-figma-plugin/utilities'

const MAX_ITERATIONS = 10

export function commandFactory ({
  processLayer,
  filterCallback,
  createLoadingMessage,
  createSuccessMessage,
  createFailureMessage
}) {
  return function () {
    const notificationHandler = figma.notify(createLoadingMessage(), {
      timeout: 60000
    })
    let count = 0
    let didChange = true
    let iterations = 0
    while (didChange === true && iterations < MAX_ITERATIONS) {
      didChange = false
      iterations++
      const layers = getSelectedLayersOrAllLayers()
      for (const layer of layers) {
        traverseLayer(
          layer,
          function (layer) {
            if (processLayer(layer) === true) {
              count++
              didChange = true
            }
          },
          filterCallback
        )
      }
    }
    const scope =
      figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
    notificationHandler.cancel()
    figma.closePlugin(
      `${
        count > 0
          ? formatSuccessMessage(createSuccessMessage(scope, count))
          : createFailureMessage(scope)
      }`
    )
  }
}
