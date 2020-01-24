import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  mapNumberToWord,
  pluralize,
  traverseLayer
} from '@create-figma-plugin/utilities'

export function commandFactory (label, filterCallback, stopTraversalCallback) {
  const [labelSingular, labelPlural] =
    typeof label === 'string' ? [label, `${label}s`] : label
  return function () {
    const layers = getLayers(filterCallback, stopTraversalCallback)
    const scope =
      figma.currentPage.selection.length > 0 ? 'within selection' : 'on page'
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No ${labelPlural} ${scope}`))
      return
    }
    figma.currentPage.selection = layers
    figma.viewport.scrollAndZoomIntoView(layers)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${mapNumberToWord(layers.length)} ${pluralize(
          layers.length,
          labelSingular,
          labelPlural
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
