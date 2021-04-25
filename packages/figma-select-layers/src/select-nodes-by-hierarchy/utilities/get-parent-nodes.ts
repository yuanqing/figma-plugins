export function getParentNodes(nodes: Array<SceneNode>): Array<SceneNode> {
  if (nodes.length === 0) {
    return figma.currentPage.children.filter(function (node) {
      return 'children' in node
    })
  }
  const result: Array<SceneNode> = []
  for (const node of nodes) {
    const nodeParent = node.parent
    if (nodeParent === null) {
      throw new Error('Node has no parent')
    }
    if (
      nodeParent.type === 'BOOLEAN_OPERATION' ||
      nodeParent.type === 'COMPONENT' ||
      nodeParent.type === 'COMPONENT_SET' ||
      nodeParent.type === 'FRAME' ||
      nodeParent.type === 'GROUP' ||
      nodeParent.type === 'INSTANCE'
    ) {
      result.push(nodeParent)
    }
  }
  return result
}
