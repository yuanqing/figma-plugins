export function isNodeTypeFactory(type: string) {
  return function (node: SceneNode): boolean {
    return node.type === type
  }
}
