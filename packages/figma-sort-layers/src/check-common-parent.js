export function checkCommonParent ([firstLayer, ...layers]) {
  if (layers.length === 0) {
    return true
  }
  const parentId = firstLayer.parent.id
  for (const layer of layers) {
    if (layer.parent.id !== parentId) {
      return false
    }
  }
  return true
}
