import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeNodesDown(
  layers: Array<SceneNode>,
  space: number
): void {
  const sortedNodes = layers.slice().sort(comparator)
  let y = null
  for (const layer of sortedNodes) {
    if (y === null) {
      y = layer.absoluteTransform[1][2]
      continue
    }
    y = y - space - layer.height
    setAbsolutePosition(layer, { y })
  }
}

function comparator(a: SceneNode, b: SceneNode): number {
  const aAbsolutePosition = getAbsolutePosition(a)
  const bAbsolutePosition = getAbsolutePosition(b)
  const difference =
    bAbsolutePosition.y + b.height - (aAbsolutePosition.y + a.height)
  return difference !== 0
    ? difference
    : aAbsolutePosition.x - bAbsolutePosition.x
}
