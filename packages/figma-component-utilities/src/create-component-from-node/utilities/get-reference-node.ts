export function getReferenceNode(node: SceneNode): SceneNode {
  const parent = node.parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  const parentType = parent.type
  if (parentType === 'PAGE') {
    return node
  }
  if (parentType === 'COMPONENT') {
    return parent as ComponentNode
  }
  return getReferenceNode(parent as SceneNode)
}
