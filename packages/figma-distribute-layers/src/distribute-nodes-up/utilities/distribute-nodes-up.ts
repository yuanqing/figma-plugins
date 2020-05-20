import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeNodesUp(
  layers: Array<SceneNode>,
  space: number
): void {
  const sortedNodes = layers.slice().sort(comparator)
  let y = null
  for (const layer of sortedNodes) {
    if (y === null) {
      y = layer.absoluteTransform[1][2] + layer.height + space
      continue
    }
    setAbsolutePosition(layer, { y })
    y = y + layer.height + space
  }
}

function comparator(a: SceneNode, b: SceneNode): number {
  const aAbsolutePosition = getAbsolutePosition(a)
  const bAbsolutePosition = getAbsolutePosition(b)
  const difference = aAbsolutePosition.y - bAbsolutePosition.y
  return difference !== 0
    ? difference
    : aAbsolutePosition.x - bAbsolutePosition.x
}
