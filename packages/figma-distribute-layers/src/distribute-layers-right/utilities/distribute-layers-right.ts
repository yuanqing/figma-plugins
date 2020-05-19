import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeLayersRight(layers, space) {
  const sortedLayers = layers.slice().sort(sortComparator)
  let x = null
  for (const layer of sortedLayers) {
    if (x === null) {
      x = layer.absoluteTransform[0][2]
      continue
    }
    x = x - space - layer.width
    setAbsolutePosition(layer, { x })
  }
}

function sortComparator(a, b) {
  const aAbsolute = getAbsolutePosition(a)
  const bAbsolute = getAbsolutePosition(b)
  const difference = bAbsolute.x + b.width - (aAbsolute.x + a.width)
  return difference !== 0 ? difference : aAbsolute.y - bAbsolute.y
}
