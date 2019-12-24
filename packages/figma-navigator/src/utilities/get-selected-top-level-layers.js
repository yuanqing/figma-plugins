/* global figma */

export function getSelectedTopLevelLayers () {
  const result = {}
  for (const selectedLayer of figma.currentPage.selection) {
    const layer = resolveTopLevelLayer(selectedLayer)
    if (
      (layer.type === 'COMPONENT' || layer.type === 'FRAME') &&
      typeof result[layer.id] === 'undefined'
    ) {
      result[layer.id] = layer
    }
  }
  return Object.values(result)
}

function resolveTopLevelLayer (layer) {
  if (layer.parent.type === 'PAGE') {
    return layer
  }
  return resolveTopLevelLayer(layer.parent)
}
