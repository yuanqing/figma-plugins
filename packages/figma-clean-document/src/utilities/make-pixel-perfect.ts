import { isWithinInstanceNode } from '@create-figma-plugin/utilities'

export function makePixelPerfect(node: SceneNode): boolean {
  if (
    node.type === 'GROUP' ||
    node.type === 'VECTOR' ||
    node.type === 'BOOLEAN_OPERATION' ||
    isWithinInstanceNode(node) === true
  ) {
    return false
  }
  let didChange = false
  if (Number.isInteger(node.x) === false) {
    didChange = true
    node.x = Math.round(node.x)
  }
  if (Number.isInteger(node.y) === false) {
    didChange = true
    node.y = Math.round(node.y)
  }
  if (
    Number.isInteger(node.width) === false ||
    Number.isInteger(node.height) === false
  ) {
    didChange = true
    if (node.type === 'LINE') {
      if (node.width === 0) {
        node.resize(0, Math.round(node.height))
      }
      if (node.height === 0) {
        node.resize(Math.round(node.width), 0)
      }
    } else {
      node.resize(Math.round(node.width), Math.round(node.height))
    }
  }
  return didChange
}
