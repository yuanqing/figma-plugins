export function getRootNodes(nodes: Array<SceneNode>): Array<SceneNode> {
  if (nodes.length === 0) {
    return figma.currentPage.children.slice()
  }
  const result = []
  for (const node of nodes) {
    result.push(resolveRootNode(node))
  }
  return result
}

function resolveRootNode(node: BaseNode) {
  if (node.parent.type === 'PAGE') {
    return node
  }
  return resolveRootNode(node.parent)
}
