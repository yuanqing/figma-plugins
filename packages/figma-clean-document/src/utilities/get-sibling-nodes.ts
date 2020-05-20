import { computeSiblingNodes } from '@create-figma-plugin/utilities'

export function getSiblingNodes(): Array<Array<SceneNode>> {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    return [figma.currentPage.children.slice().reverse()]
  }
  if (selection.length === 1 && 'children' in selection[0]) {
    return computeSiblingNodes([selection[0], ...selection[0].children])
  }
  return computeSiblingNodes(selection.slice())
}
