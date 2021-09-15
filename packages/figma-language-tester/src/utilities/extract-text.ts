import { TextNodePlainObject, TranslatableNode } from './types'

export function extractText(
  nodes: Array<TranslatableNode>
): Array<TextNodePlainObject> {
  const result: Array<TextNodePlainObject> = []
  for (const node of nodes) {
    if (node.type === 'TEXT') {
      result.push({ characters: node.characters, id: node.id })
    } else {
      result.push({ characters: node.text.characters, id: node.id })
    }
  }
  return result
}
