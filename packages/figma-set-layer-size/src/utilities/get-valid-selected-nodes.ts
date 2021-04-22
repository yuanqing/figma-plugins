import { isWithinInstance } from '@create-figma-plugin/utilities'

export function getValidSelectedNodes(): Array<SceneNode> {
  return figma.currentPage.selection.filter(function (node: SceneNode) {
    return isWithinInstance(node) === false
  })
}
