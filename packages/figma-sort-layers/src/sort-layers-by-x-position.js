export function sortLayersByXPosition (layers) {
  return [].concat(layers).sort(function (a, b) {
    return a.x - b.x
  })
}
