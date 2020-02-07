export function sortLayersByXPosition (layers) {
  const parentLayer = layers[0].parent
  if (parentLayer.layoutMode === 'HORIZONTAL') {
    return null
  }
  const result = layers.slice().sort(function (a, b) {
    if (a.x !== b.x) {
      return a.x - b.x
    }
    if (a.y !== b.y) {
      return a.y - b.y
    }
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName !== bName) {
      return aName.localeCompare(bName, { numeric: true })
    }
    return a.id.localeCompare(b.id, { numeric: true })
  })
  return parentLayer.layoutMode === 'VERTICAL' ? result.reverse() : result
}
