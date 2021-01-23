export function isNodeTypeFactory(type: string) {
  return function (node: SceneNode) {
    return node.type === type
  }
}
