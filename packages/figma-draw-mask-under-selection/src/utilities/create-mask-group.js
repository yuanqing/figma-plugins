import {
  computeMaximumBounds,
  insertAfterLayer
} from '@create-figma-plugin/utilities'

export function createMaskGroup (layers) {
  const mask = createMaskLayer(layers)
  insertAfterLayer(mask, layers[layers.length - 1])
  const group = figma.group([...layers, mask], layers[0].parent)
  group.name = 'Mask Group'
  return mask
}

function createMaskLayer (layers) {
  const mask = figma.createRectangle()
  mask.name = 'Mask'
  const maximumBounds = computeMaximumBounds(layers)
  mask.x = maximumBounds[0].x
  mask.y = maximumBounds[0].y
  const width = maximumBounds[1].x - maximumBounds[0].x
  const height = maximumBounds[1].y - maximumBounds[0].y
  mask.resize(width, height)
  mask.isMask = true
  mask.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  return mask
}
