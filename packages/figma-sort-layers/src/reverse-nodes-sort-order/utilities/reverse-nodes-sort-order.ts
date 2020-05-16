export function reverseNodesSortOrder (
  nodes: Array<SceneNode>
): null | Array<SceneNode> {
  return nodes.slice().reverse()
}
