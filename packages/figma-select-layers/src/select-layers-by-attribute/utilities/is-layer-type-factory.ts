export function isLayerTypeFactory(type) {
  return function (layer) {
    return layer.type === type
  }
}
