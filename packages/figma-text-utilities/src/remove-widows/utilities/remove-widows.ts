import { loadFontsAsync } from '@create-figma-plugin/utilities'

const NEWLINE_REGEX = /\n/g

const SPACE = ' '
const NON_BREAKING_SPACE = ' '

export async function removeWidowsAsync(
  nodes: Array<TextNode>
): Promise<Array<TextNode>> {
  await loadFontsAsync(nodes)
  for (const node of nodes) {
    const lines = node.characters.split(NEWLINE_REGEX)
    let lineStartIndex = 0
    let i = 0
    while (i < lines.length) {
      const currentLine = lines[i]
      const spaceLastIndex = Math.max(
        currentLine.lastIndexOf(SPACE),
        currentLine.lastIndexOf(NON_BREAKING_SPACE)
      )
      if (spaceLastIndex === -1) {
        i += 1
        continue
      }
      const previousLine = i === 0 ? null : lines[i - 1]
      lineStartIndex += previousLine === null ? 0 : previousLine.length + 1
      let j = 0
      while (j < currentLine.length) {
        const character = currentLine[j]
        if (j === spaceLastIndex) {
          replaceCharacter({
            character: NON_BREAKING_SPACE,
            index: lineStartIndex + j,
            node
          })
          j += 1
          continue
        }
        if (character == NON_BREAKING_SPACE) {
          replaceCharacter({
            character: SPACE,
            index: lineStartIndex + j,
            node
          })
        }
        j += 1
      }
      i += 1
    }
  }
  return nodes
}

function replaceCharacter(options: {
  node: TextNode
  character: string
  index: number
}) {
  const { node, character, index } = options
  node.insertCharacters(index + 1, character, 'BEFORE')
  node.deleteCharacters(index, index + 1)
}
