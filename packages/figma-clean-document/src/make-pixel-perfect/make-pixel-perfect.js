export function makePixelPerfect (layer) {
  if (layer.type === 'GROUP' || layer.type === 'VECTOR') {
    return false
  }
  let didChange = false
  if (Number.isInteger(layer.x) === false) {
    layer.x = Math.round(layer.x)
    didChange = true
  }
  if (Number.isInteger(layer.y) === false) {
    layer.y = Math.round(layer.y)
    didChange = true
  }
  if (
    Number.isInteger(layer.width) === false ||
    Number.isInteger(layer.height) === false
  ) {
    layer.resize(Math.round(layer.width), Math.round(layer.height))
    didChange = true
  }
  return didChange
}
