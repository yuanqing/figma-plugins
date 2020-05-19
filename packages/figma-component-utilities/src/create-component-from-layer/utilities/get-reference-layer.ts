export function getReferenceLayer(layer) {
  const parentType = layer.parent.type
  if (parentType === 'PAGE') {
    return layer
  }
  if (parentType === 'COMPONENT') {
    return layer.parent
  }
  return getReferenceLayer(layer.parent)
}
