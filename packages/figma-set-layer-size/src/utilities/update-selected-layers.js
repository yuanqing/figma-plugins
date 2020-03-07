export function updateSelectedLayers (layers) {
  const selectedLayers = []
  for (const { id } of layers) {
    const layer = figma.getNodeById(id)
    selectedLayers.push(layer)
  }
  figma.currentPage.selection = selectedLayers
}
