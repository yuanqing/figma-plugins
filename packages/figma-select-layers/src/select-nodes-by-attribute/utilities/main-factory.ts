import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedNodesOrAllNodes,
  pluralize,
  traverseNode
} from '@create-figma-plugin/utilities'

export function mainFactory(
  label: [string, string] | string,
  filterCallback: (node: SceneNode) => boolean,
  stopTraversalCallback?: (node: SceneNode) => boolean
) {
  const [labelSingular, labelPlural] =
    typeof label === 'string' ? [label, `${label}s`] : label
  return function () {
    const nodes = getNodes(filterCallback, stopTraversalCallback)
    const scope =
      figma.currentPage.selection.length > 0 ? 'within selection' : 'on page'
    if (nodes.length === 0) {
      figma.closePlugin(formatErrorMessage(`No ${labelPlural} ${scope}`))
      return
    }
    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${nodes.length} ${pluralize(
          nodes.length,
          labelSingular,
          labelPlural
        )} ${scope}`
      )
    )
  }
}

function getNodes(
  filterCallback: (node: SceneNode) => boolean,
  stopTraversalCallback?: (node: SceneNode) => boolean
) {
  const nodes = getSelectedNodesOrAllNodes()
  const result = []
  for (const node of nodes) {
    traverseNode(
      node,
      function (node) {
        if (filterCallback(node) === true) {
          result.push(node)
        }
      },
      stopTraversalCallback
    )
  }
  return result
}
