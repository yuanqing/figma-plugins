export function offsetLayerSize (
  layers,
  offsetWidth,
  offsetHeight,
  resizeWithConstraints
) {
  for (const { id } of layers) {
    const layer = figma.getNodeById(id)
    const newWidth =
      offsetWidth === null
        ? layer.width
        : Math.ceil(layer.width + offsetWidth, 0.01)
    const newHeight =
      offsetHeight === null || layer.type === 'LINE'
        ? layer.height
        : Math.ceil(layer.height + offsetHeight, 0.01)
    if (layer.type === 'GROUP' || resizeWithConstraints === true) {
      layer.resize(newWidth, newHeight)
    } else {
      layer.resizeWithoutConstraints(newWidth, newHeight)
    }
  }
}
