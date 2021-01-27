import { Image } from '../types'

export async function readImageNodesAsync(
  nodes: Array<SceneNode>
): Promise<Array<Image>> {
  const result = []
  for (const node of nodes) {
    if (node.type !== 'RECTANGLE') {
      continue
    }
    for (const paint of node.fills as Array<Paint>) {
      if (paint.type !== 'IMAGE') {
        continue
      }
      const image = figma.getImageByHash(paint.imageHash as string)
      const bytes = await image.getBytesAsync()
      result.push({
        bytes,
        height: node.height,
        id: node.id,
        width: node.width
      })
    }
  }
  return result
}
