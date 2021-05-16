import { loadFontsAsync } from '@create-figma-plugin/utilities'

import { TextNodePlainObject } from './types.js'

export async function updateTextNodesAsync(
  textNodePlainObjects: Array<TextNodePlainObject>
): Promise<void> {
  for (const { id, characters } of textNodePlainObjects) {
    const node = figma.getNodeById(id)
    if (node === null) {
      continue
    }
    const textNode = node as TextNode
    await loadFontsAsync([textNode])
    textNode.characters = characters
  }
}
