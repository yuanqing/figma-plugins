import { sortNodesByCanonicalOrder } from '@create-figma-plugin/utilities'

export function getVisibleTopLevelFrameNodes(): Array<
  FrameNode | ComponentNode
> {
  const nodes = figma.currentPage.findChildren(function (node) {
    return (
      (node.type === 'FRAME' || node.type === 'COMPONENT') &&
      node.visible === true
    )
  }) as Array<FrameNode | ComponentNode>
  return sortNodesByCanonicalOrder(nodes).reverse()
}
