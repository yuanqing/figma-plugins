import { loadFontsAsync } from '@create-figma-plugin/utilities'

import { TextNodePlainObject, TranslatableNode } from './types.js'

export async function updateTextNodesAsync(
  textNodePlainObjects: Array<TextNodePlainObject>
): Promise<void> {
  for (const { id, characters } of textNodePlainObjects) {
    const node = figma.getNodeById(id)
    if (node === null) {
      continue
    }
    const textNode = node as TranslatableNode
    await loadFontsAsync([textNode])

    if (textNode.type === 'TEXT') {
      textNode.characters = characters
    } else {
      textNode.text.characters = characters
    }
  }
}
