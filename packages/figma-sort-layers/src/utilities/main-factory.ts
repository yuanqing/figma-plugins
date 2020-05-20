import {
  computeSiblingNodes,
  formatErrorMessage,
  formatSuccessMessage,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

const errorMessage = formatErrorMessage('Select two or more layers')

export function mainFactory(options: {
  sortNodes: (nodes: Array<SceneNode>) => null | Array<SceneNode>
  successMessage: string
}): () => void {
  const { sortNodes, successMessage } = options
  return function (): void {
    if (figma.currentPage.selection.length === 0) {
      figma.closePlugin(errorMessage)
      return
    }
    const groups = computeGroups()
    if (groups === null) {
      figma.closePlugin(errorMessage)
      return
    }
    let didChange = false
    for (const nodes of groups) {
      const result = sortNodes(nodes)
      if (result !== null) {
        didChange = updateNodesSortOrder(result) || didChange
      }
    }
    figma.closePlugin(
      didChange === true
        ? formatSuccessMessage(successMessage)
        : 'No change to sort order'
    )
  }
}

function computeGroups(): null | Array<Array<SceneNode>> {
  const selection = figma.currentPage.selection
  if (selection.length === 1) {
    if ('children' in selection[0] && selection[0].children.length > 1) {
      return computeSiblingNodes(selection[0].children.slice())
    }
    return null
  }
  return computeSiblingNodes(selection.slice())
}
