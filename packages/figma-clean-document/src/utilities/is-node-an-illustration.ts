const CONSECUTIVE_LAYER_COUNT = 50

export function isNodeAnIllustration(node: SceneNode): boolean {
  if (
    (node.type !== 'FRAME' && node.type !== 'GROUP') ||
    typeof node.children === 'undefined'
  ) {
    return false
  }
  let count = 0
  for (const child of node.children) {
    if (
      child.type === 'BOOLEAN_OPERATION' ||
      child.type === 'FRAME' ||
      child.type === 'GROUP' ||
      child.type === 'RECTANGLE' ||
      child.type === 'VECTOR'
    ) {
      count++
      if (count === CONSECUTIVE_LAYER_COUNT) {
        break
      }
    } else {
      return false
    }
  }
  return true
}
