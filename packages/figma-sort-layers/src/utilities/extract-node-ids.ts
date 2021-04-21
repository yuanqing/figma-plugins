export function extractNodeIds(nodes: Array<BaseNode>): Array<string> {
  return nodes.map(function (node: BaseNode) {
    return node.id
  })
}
