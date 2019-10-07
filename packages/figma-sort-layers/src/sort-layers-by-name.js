import naturalCompare from 'natural-compare-lite'

export function sortLayersByName (layers) {
  return [].concat(layers).sort(function (a, b) {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName === bName) {
      if (a.type !== 'PAGE') {
        const yPositionDifference = a.y - b.y
        if (yPositionDifference !== 0) {
          return yPositionDifference
        }
        const xPositionDifference = a.x - b.x
        if (xPositionDifference !== 0) {
          return xPositionDifference
        }
      }
      return naturalCompare(a.id, b.id)
    }
    return naturalCompare(aName, bName)
  })
}
