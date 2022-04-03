export function sortFrameNodes(
  nodes: Array<FrameNode | ComponentNode>
): Array<FrameNode | ComponentNode> {
  const rows = groupNodesByRow(nodes)
  let result: Array<FrameNode | ComponentNode> = []
  for (const row of rows) {
    result = result.concat(sortNodesByXPosition(row).reverse())
  }
  return result.reverse()
}

function groupNodesByRow(
  nodes: Array<FrameNode | ComponentNode>
): Array<Array<FrameNode | ComponentNode>> {
  const [firstNode, ...rest] = sortNodesByYPosition(nodes).reverse()
  const rows: Array<Array<FrameNode | ComponentNode>> = []
  let row: Array<FrameNode | ComponentNode> = [firstNode]
  let maxY = firstNode.y + firstNode.height
  for (const node of rest) {
    if (node.y > maxY) {
      rows.push(row)
      row = [node]
      maxY = node.y + node.height
      continue
    }
    row.push(node)
    maxY = Math.max(node.y + node.height, maxY)
  }
  rows.push(row)
  return rows
}

function sortNodesByXPosition(
  nodes: Array<FrameNode | ComponentNode>
): Array<FrameNode | ComponentNode> {
  return nodes.slice().sort(function (a: SceneNode, b: SceneNode): number {
    if (a.x !== b.x) {
      return b.x - a.x
    }
    return b.y - a.y
  })
}

function sortNodesByYPosition(
  nodes: Array<FrameNode | ComponentNode>
): Array<FrameNode | ComponentNode> {
  return nodes.slice().sort(function (a: SceneNode, b: SceneNode): number {
    if (a.y !== b.y) {
      return b.y - a.y
    }
    return b.x - a.x
  })
}
