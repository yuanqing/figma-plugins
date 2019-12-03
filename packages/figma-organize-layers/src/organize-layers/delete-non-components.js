export function deleteNonComponents (layers) {
  for (const layer of layers) {
    if (layer.type !== 'COMPONENT') {
      layer.remove()
    }
  }
}
