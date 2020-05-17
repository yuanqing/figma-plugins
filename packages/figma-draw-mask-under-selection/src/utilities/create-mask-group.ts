import {
  computeMaximumBounds,
  insertAfterNode,
  setAbsolutePosition,
  sortNodesByCanonicalOrder
} from '@create-figma-plugin/utilities'

export function createMaskGroup (layers) {
  const mask = insertMaskLayer(layers)
  const parent = mask.parent
  const group = figma.group(
    [...layers, mask],
    parent,
    parent.children.indexOf(mask)
  )
  group.name = 'Mask Group'
  return mask
}

function insertMaskLayer (layers) {
  const mask = figma.createRectangle()
  const bottomMostLayer = sortNodesByCanonicalOrder(layers)[0]
  insertAfterNode(mask, bottomMostLayer)
  mask.name = 'Mask'
  const maximumBounds = computeMaximumBounds(layers)
  setAbsolutePosition(mask, {
    x: maximumBounds[0].x,
    y: maximumBounds[0].y
  })
  const width = maximumBounds[1].x - maximumBounds[0].x
  const height = maximumBounds[1].y - maximumBounds[0].y
  mask.resize(width, height)
  mask.isMask = true
  mask.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  return mask
}
