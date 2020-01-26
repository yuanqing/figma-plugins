import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeLayersUp (layers, space) {
  const sortedLayers = [].concat(layers).sort(sortComparator)
  let y = null
  for (const layer of sortedLayers) {
    if (y === null) {
      y = layer.absoluteTransform[1][2] + layer.height + space
      continue
    }
    setAbsolutePosition(layer, { y })
    y = y + layer.height + space
  }
}

function sortComparator (a, b) {
  const aAbsolute = getAbsolutePosition(a)
  const bAbsolute = getAbsolutePosition(b)
  const difference = aAbsolute.y - bAbsolute.y
  return difference !== 0 ? difference : aAbsolute.x - bAbsolute.x
}
