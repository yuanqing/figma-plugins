import naturalCompare from 'natural-compare-lite'

export function sortLayersByName (layers) {
  return [].concat(layers).sort(function (a, b) {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName === bName) {
      return a.y - b.y || a.x - b.x || naturalCompare(a.id, b.id)
    }
    return naturalCompare(aName, bName)
  })
}
