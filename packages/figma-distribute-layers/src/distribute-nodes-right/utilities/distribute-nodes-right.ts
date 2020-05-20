import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeNodesRight(
  layers: Array<SceneNode>,
  space: number
): void {
  const sortedNodes = layers.slice().sort(comparator)
  let x = null
  for (const layer of sortedNodes) {
    if (x === null) {
      x = layer.absoluteTransform[0][2]
      continue
    }
    x = x - space - layer.width
    setAbsolutePosition(layer, { x })
  }
}

function comparator(a: SceneNode, b: SceneNode): number {
  const aAbsolutePosition = getAbsolutePosition(a)
  const bAbsolutePosition = getAbsolutePosition(b)
  const difference =
    bAbsolutePosition.x + b.width - (aAbsolutePosition.x + a.width)
  return difference !== 0
    ? difference
    : aAbsolutePosition.y - bAbsolutePosition.y
}
