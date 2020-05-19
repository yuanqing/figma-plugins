import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeLayersLeft(layers, space) {
  const sortedLayers = layers.slice().sort(sortComparator)
  let x = null
  for (const layer of sortedLayers) {
    if (x === null) {
      x = layer.absoluteTransform[0][2] + layer.width + space
      continue
    }
    setAbsolutePosition(layer, { x })
    x = x + layer.width + space
  }
}

function sortComparator(a, b) {
  const aAbsolute = getAbsolutePosition(a)
  const bAbsolute = getAbsolutePosition(b)
  const difference = aAbsolute.x - bAbsolute.x
  return difference !== 0 ? difference : aAbsolute.y - bAbsolute.y
}
