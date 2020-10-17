import {
  insertBeforeNode,
  loadFontsAsync
} from '@create-figma-plugin/utilities'

import { copyTextNodeStyles } from './copy-text-node-styles'

export async function splitTextNodesByLine(
  nodes: Array<TextNode>
): Promise<Array<TextNode>> {
  await loadFontsAsync(nodes)
  let result: Array<TextNode> = []
  for (const node of nodes) {
    result = result.concat(await splitTextNodeByLine(node))
  }
  return result
}

async function splitTextNodeByLine(node: TextNode): Promise<Array<TextNode>> {
  const parent = node.parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  const lines = node.characters.split('\n')
  if (lines.length === 1) {
    return [node]
  }
  let y = node.y
  let offset = 0
  const result = []
  for (const line of lines) {
    if (line === '') {
      offset += 1 // +1 for newline
      continue
    }
    const newNode = figma.createText()
    await loadFontsAsync([newNode])
    insertBeforeNode(newNode, node)
    newNode.x = node.x
    newNode.y = y
    const characters = line === '' ? ' ' : line
    newNode.characters = characters
    copyTextNodeStyles(newNode, node, offset)
    y += newNode.height + node.paragraphSpacing
    offset += line.length + 1 // +1 for newline
    result.push(newNode)
  }
  node.remove()
  return result
}
