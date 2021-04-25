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

function resolveRootNode(node: SceneNode): SceneNode {
  const parentNode = node.parent
  if (parentNode === null) {
    throw new Error('Node has no parent')
  }
  if (parentNode.type === 'PAGE') {
    return node
  }
  if (parentNode.type === 'DOCUMENT') {
    throw new Error('Invariant violation')
  }
  return resolveRootNode(parentNode)
}
