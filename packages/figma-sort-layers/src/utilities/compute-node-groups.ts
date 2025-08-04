import { computeSiblingNodes } from '@create-figma-plugin/utilities'

export function computeNodeGroups(): null | Array<Array<SceneNode>> {
  const selection = figma.currentPage.selection
  if (selection.length === 1) {
    if ('children' in selection[0] && selection[0].children.length > 1) {
      return computeSiblingNodes(selection[0].children.slice())
    }
    return null
  }
  return computeSiblingNodes(selection.slice())
}
