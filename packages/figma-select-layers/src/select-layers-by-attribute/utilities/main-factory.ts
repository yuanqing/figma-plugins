import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedNodesOrAllNodes,
  pluralize,
  traverseNode
} from '@create-figma-plugin/utilities'

export function mainFactory(label, filterCallback, stopTraversalCallback?) {
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
        `Selected ${layers.length} ${pluralize(
          layers.length,
          labelSingular,
          labelPlural
        )} ${scope}`
      )
    )
  }
}

function getLayers(filterCallback, stopTraversalCallback) {
  const layers = getSelectedNodesOrAllNodes()
  const result = []
  for (const layer of layers) {
    traverseNode(
      layer,
      function (layer) {
        if (filterCallback(layer) === true) {
          result.push(layer)
        }
      },
      stopTraversalCallback
    )
  }
  return result
}
