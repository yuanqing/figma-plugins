import { createImagePaint } from '@create-figma-plugin/utilities'

import { ImageAttributes } from '../types'

export function createImageNode(
  data: ImageAttributes,
  xOffset: number,
  yOffset: number,
  insertAs2x: boolean
): RectangleNode {
  const { bytes, x, y, width, height } = data
  const rectangle = figma.createRectangle()
  rectangle.name = 'Image'
  rectangle.x = (insertAs2x === true ? x / 2 : x) + xOffset
  rectangle.y = (insertAs2x === true ? y / 2 : y) + yOffset
  rectangle.resize(
    insertAs2x === true ? width / 2 : width,
    insertAs2x === true ? height / 2 : height
  )
  rectangle.fills = [createImagePaint(bytes)]
  return rectangle
}
