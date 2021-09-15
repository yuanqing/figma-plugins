import { isWithinInstanceNode } from '@create-figma-plugin/utilities'

import { ResizableNode } from './types'

export function getValidSelectedNodes(): Array<ResizableNode> {
  return figma.currentPage.selection.filter(function (
    node: SceneNode
  ): node is ResizableNode {
    return (
      'resize' in node &&
      'resizeWithoutConstraints' in node &&
      isWithinInstanceNode(node) === false
    )
  })
}
