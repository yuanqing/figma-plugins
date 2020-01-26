import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

export function distributeLayersDown (layers, space) {
  const sortedLayers = [].concat(layers).sort(sortComparator)
  let y = null
  for (const layer of sortedLayers) {
    if (y === null) {
      y = layer.absoluteTransform[1][2]
      continue
    }
    y = y - space - layer.height
    setAbsolutePosition(layer, { y })
  }
}

function sortComparator (a, b) {
  const aAbsolute = getAbsolutePosition(a)
  const bAbsolute = getAbsolutePosition(b)
  const difference = bAbsolute.y + b.height - (aAbsolute.y + a.height)
  return difference !== 0 ? difference : aAbsolute.x - bAbsolute.x
}
