import { traverseNode } from '@create-figma-plugin/utilities'

export function filterNodesByName(
  nodes: Array<SceneNode>,
  layerName: string,
  exactMatch: boolean
): Array<SceneNode> {
  const result: Array<SceneNode> = []
  if (layerName === '') {
    return result
  }
  if (exactMatch === true) {
    for (const node of nodes) {
      traverseNode(node, function (childNode) {
        if (childNode.name === layerName) {
          result.push(childNode)
        }
      })
    }
  } else {
    const regex = new RegExp(layerName, 'i')
    for (const node of nodes) {
      traverseNode(node, function (childNode) {
        if (regex.test(childNode.name) === true) {
          result.push(childNode)
        }
      })
    }
  }
  return result
}
