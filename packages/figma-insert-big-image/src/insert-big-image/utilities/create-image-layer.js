import { createImagePaint } from '@create-figma-plugin/utilities'

export function createImageLayer (
  [bytes, x, y, width, height],
  xOffset,
  yOffset,
  insertAs2x
) {
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
