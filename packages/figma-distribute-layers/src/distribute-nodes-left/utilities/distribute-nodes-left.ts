import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeNodesLeft(
  layers: Array<SceneNode>,
  space: number
): void {
  const sortedNodes = layers.slice().sort(comparator)
  let x = null
  for (const layer of sortedNodes) {
    if (x === null) {
      x = layer.absoluteTransform[0][2] + layer.width + space
      continue
    }
    setAbsolutePosition(layer, { x })
    x = x + layer.width + space
  }
}

function comparator(a: SceneNode, b: SceneNode): number {
  const aAbsolutePosition = getAbsolutePosition(a)
  const bAbsolutePosition = getAbsolutePosition(b)
  const difference = aAbsolutePosition.x - bAbsolutePosition.x
  return difference !== 0
    ? difference
    : aAbsolutePosition.y - bAbsolutePosition.y
}
