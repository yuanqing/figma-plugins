export function groupNodesByAxis(
  nodes: Array<TextNode>,
  axis: keyof Vector
): Array<Array<TextNode>> {
  const dimension = axis === 'x' ? 'width' : 'height'
  const [firstNode, ...rest] = sortNodesByPosition(nodes, axis)
  const result: Array<Array<TextNode>> = []
  let group: Array<TextNode> = [firstNode]
  let end = firstNode[axis] + firstNode[dimension]
  for (const node of rest) {
    if (node[axis] > end) {
      end = node[axis] + node[dimension]
      result.push(group)
      group = [node]
      continue
    }
    end = Math.max(end, node[axis] + node[dimension])
    group.push(node)
  }
  result.push(group)
  return result
}

function sortNodesByPosition(
  nodes: Array<TextNode>,
  axis: keyof Vector
): Array<TextNode> {
  const parent = nodes[0].parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  const orthogonalAxis = axis === 'x' ? 'y' : 'x'
  const result = nodes
    .slice()
    .sort(function (a: TextNode, b: TextNode): number {
      if (a[axis] !== b[axis]) {
        return a[axis] - b[axis]
      }
      if (a[orthogonalAxis] !== b[orthogonalAxis]) {
        return a[orthogonalAxis] - b[orthogonalAxis]
      }
      return 0
    })
  return result
}
