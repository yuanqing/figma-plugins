import {
  createImagePaint,
  insertAfterNode
} from '@create-figma-plugin/utilities'

import { Image } from '../types'

const OFFSET = 50

export function createImageNode({
  id,
  width,
  height,
  bytes
}: Image): RectangleNode {
  const node = figma.getNodeById(id) as SceneNode
  const rectangle = figma.createRectangle()
  rectangle.name = node.name
  rectangle.x = node.x + OFFSET
  rectangle.y = node.y + OFFSET
  rectangle.resize(width, height)
  rectangle.fills = [createImagePaint(bytes)]
  insertAfterNode(rectangle, node)
  return rectangle
}
