export function sortLayersByYPosition (layers) {
  return [].concat(layers).sort(function (a, b) {
    return a.y - b.y
  })
}
