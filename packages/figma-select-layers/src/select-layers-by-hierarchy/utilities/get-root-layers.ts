export function getRootLayers(layers) {
  if (layers.length === 0) {
    return figma.currentPage.children
  }
  const result = []
  for (const layer of layers) {
    result.push(resolveRootLayer(layer))
  }
  return result
}

function resolveRootLayer(layer) {
  if (layer.parent.type === 'PAGE') {
    return layer
  }
  return resolveRootLayer(layer.parent)
}
