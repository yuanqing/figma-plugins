import { getAbsolutePosition } from '@create-figma-plugin/utilities'

export function sortNodesByPosition(
  nodes: Array<TextNode>,
  axis: keyof Vector
): Array<TextNode> {
  const parent = nodes[0].parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  const orthogonalAxis = axis === 'x' ? 'y' : 'x'
  const result = nodes.slice().sort(function (
    a: TextNode,
    b: TextNode
  ): number {
    const aAbsolutePosition = getAbsolutePosition(a)
    const bAbsolutePosition = getAbsolutePosition(b)
    if (aAbsolutePosition[axis] !== bAbsolutePosition[axis]) {
      return aAbsolutePosition[axis] - bAbsolutePosition[axis]
    }
    if (
      aAbsolutePosition[orthogonalAxis] !== bAbsolutePosition[orthogonalAxis]
    ) {
      return (
        aAbsolutePosition[orthogonalAxis] - bAbsolutePosition[orthogonalAxis]
      )
    }
    return 0
  })
  return result
}
