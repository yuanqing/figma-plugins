export function getNextLayer (layers, currentLayer, indexOffset, loop) {
  const currentIndex = layers.indexOf(currentLayer)
  const nextIndex = currentIndex + indexOffset
  if (nextIndex === -1) {
    return loop === true ? layers[layers.length - 1] : null
  }
  if (nextIndex === layers.length) {
    return loop === true ? layers[0] : null
  }
  return layers[nextIndex]
}
