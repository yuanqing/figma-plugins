export function deleteHiddenLayer (layer) {
  if (layer.visible === false) {
    layer.remove()
    return true
  }
  return false
}
