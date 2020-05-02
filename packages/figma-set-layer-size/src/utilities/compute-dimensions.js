import { MIXED } from './constants'

export function computeDimensions (layers) {
  if (layers.length === 0) {
    return { width: '', height: '' }
  }
  if (layers.length === 1) {
    const { width, height } = layers[0]
    return { width, height }
  }
  const [firstLayer, ...remainingLayers] = layers
  const result = {
    width: firstLayer.width,
    height: firstLayer.height
  }
  for (const { width, height } of remainingLayers) {
    if (result.width !== MIXED && result.width !== width) {
      result.width = MIXED
    }
    if (result.height !== MIXED && result.height !== height) {
      result.height = MIXED
    }
  }
  return result
}
