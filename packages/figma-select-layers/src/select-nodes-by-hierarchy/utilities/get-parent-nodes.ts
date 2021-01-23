export function getParentNodes(nodes: Array<SceneNode>): Array<SceneNode> {
  if (nodes.length === 0) {
    return figma.currentPage.children.filter(function (node) {
      return 'children' in node
    })
  }
  const result = []
  for (const node of nodes) {
    if (node.parent.type !== 'PAGE') {
      result.push(node.parent)
      continue
    }
    if ('children' in node) {
      result.push(node)
    }
  }
  return result
}
