import { isWithinInstance } from '@create-figma-plugin/utilities'

export function deleteHiddenNodes(node: SceneNode): boolean {
  if (node.visible === true || isWithinInstance(node) === true) {
    return false
  }
  node.remove()
  const selection = figma.currentPage.selection
  if (selection.indexOf(node) !== -1) {
    // Remove `node` from `selection`
    figma.currentPage.selection = selection.filter(function ({ id }) {
      return id !== node.id
    })
  }
  return true
}
