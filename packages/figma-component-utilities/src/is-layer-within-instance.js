export function isLayerWithinInstance (layer) {
  const parent = layer.parent
  if (parent.type === 'INSTANCE') {
    return true
  }
  if (parent.type === 'PAGE') {
    return false
  }
  return isLayerWithinInstance(parent)
}
