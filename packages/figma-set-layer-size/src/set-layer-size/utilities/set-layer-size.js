export function setLayerSize (layers, width, height, resizeWithConstraints) {
  for (const { id } of layers) {
    const layer = figma.getNodeById(id)
    const newWidth = width === null ? layer.width : width
    const newHeight = height === null ? layer.height : height
    if (layer.type === 'GROUP' || resizeWithConstraints === true) {
      layer.resize(newWidth, newHeight)
    } else {
      layer.resizeWithoutConstraints(newWidth, newHeight)
    }
  }
}
