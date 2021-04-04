import { createImagePaint } from '@create-figma-plugin/utilities'

import { ImageAttributes } from '../types'

export function createImageNode(
  image: ImageAttributes,
  options: {
    resolution: number
    xOffset: number
    yOffset: number
  }
): RectangleNode {
  const { bytes, x, y, width, height } = image
  const { resolution, xOffset, yOffset } = options
  const rectangle = figma.createRectangle()
  rectangle.name = 'Image'
  rectangle.x = x / resolution + xOffset
  rectangle.y = y / resolution + yOffset
  rectangle.resize(width / resolution, height / resolution)
  rectangle.fills = [createImagePaint(bytes)]
  return rectangle
}
