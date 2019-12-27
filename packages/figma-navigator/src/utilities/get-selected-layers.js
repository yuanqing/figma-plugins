export function getSelectedLayers () {
  const result = {}
  for (const selectedLayer of figma.currentPage.selection) {
    const layer = resolveNearestParent(selectedLayer)
    if (layer !== null && typeof result[layer.id] === 'undefined') {
      result[layer.id] = layer
    }
  }
  return Object.values(result)
}

function resolveNearestParent (layer) {
  if (layer.type === 'COMPONENT' || layer.type === 'FRAME') {
    return layer
  }
  if (layer.parent.type === 'PAGE') {
    return null
  }
  return resolveNearestParent(layer.parent)
}
