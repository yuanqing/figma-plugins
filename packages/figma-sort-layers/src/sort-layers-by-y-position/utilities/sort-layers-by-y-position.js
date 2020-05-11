import naturalCompare from 'natural-compare-lite'

export function sortLayersByYPosition (layers) {
  const parentLayer = layers[0].parent
  if (parentLayer.layoutMode === 'VERTICAL') {
    return null
  }
  const result = layers.slice().sort(function (a, b) {
    if (a.y !== b.y) {
      return a.y - b.y
    }
    if (a.x !== b.x) {
      return a.x - b.x
    }
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName !== bName) {
      return naturalCompare(aName, bName)
    }
    return naturalCompare(a.id, b.id)
  })
  return parentLayer.layoutMode === 'HORIZONTAL' ? result.reverse() : result
}
