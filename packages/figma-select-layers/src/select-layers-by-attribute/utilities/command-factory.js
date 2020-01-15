import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  mapNumberToWord,
  pluralize,
  traverseLayer
} from '@create-figma-plugin/utilities'

export function commandFactory (label, filterCallback, stopTraversalCallback) {
  return function () {
    const layers = getLayers(filterCallback, stopTraversalCallback)
    const scope =
      figma.currentPage.selection.length > 0 ? 'within selection' : 'on page'
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
        )} ${scope}`
      )
    )
  }
}

function getLayers (filterCallback, stopTraversalCallback) {
  const layers = getSelectedLayersOrAllLayers()
  const result = []
  for (const layer of layers) {
    traverseLayer(layer, function (layer) {
      if (filterCallback(layer) === true) {
        result.push(layer)
        if (
          typeof stopTraversalCallback === 'function' &&
          stopTraversalCallback(layer) === true
        ) {
          return false // return `false` to stop traversal of `children`
        }
      }
    })
  }
  return result
}
