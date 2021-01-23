import {
  deduplicateNodes,
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

export function mainFactory(
  label: string,
  getNodesCallback: (nodes: Array<SceneNode>) => Array<SceneNode>
) {
  return function () {
    if (figma.currentPage.children.length === 0) {
      figma.closePlugin(formatErrorMessage('No layers on page'))
      return
    }
    const scope =
      figma.currentPage.selection.length > 0 ? 'within selection' : 'on page'
    const nodes = deduplicateNodes(
      getNodesCallback(figma.currentPage.selection.slice())
    )
    if (nodes.length === 0) {
      figma.closePlugin(formatErrorMessage(`No ${label}s ${scope}`))
      return
    }
    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${nodes.length} ${pluralize(nodes.length, label)}`
      )
    )
  }
}
