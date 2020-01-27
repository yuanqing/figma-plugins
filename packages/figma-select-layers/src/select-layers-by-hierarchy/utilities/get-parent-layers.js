export function getParentLayers (layers) {
  if (layers.length === 0) {
    return figma.currentPage.children.filter(function (layer) {
      return typeof layer.children !== 'undefined'
    })
  }
  const result = []
  for (const layer of layers) {
    if (layer.parent.type !== 'PAGE') {
      result.push(layer.parent)
      continue
    }
    if (typeof layer.children !== 'undefined') {
      result.push(layer)
    }
  }
  return result
}
