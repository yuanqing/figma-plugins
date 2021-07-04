import { loadFontsAsync, traverseNode } from '@create-figma-plugin/utilities'

export async function findAndReplaceAsync(
  nodes: Array<SceneNode>,
  options: {
    caseSensitive: boolean
    findString: string
    replaceString: string
  }
): Promise<number> {
  const { caseSensitive, findString, replaceString } = options
  const textNodes = filterTextNodes(nodes)
  await loadFontsAsync(textNodes)
  const regex = new RegExp(findString, caseSensitive === true ? 'g' : 'ig')
  let count = 0
  for (const textNode of textNodes) {
    const characters = textNode.characters
    if (regex.test(characters) === false) {
      continue
    }
    textNode.characters = characters.replace(regex, function () {
      count += 1
      return replaceString
    })
  }
  return count
}

export function filterTextNodes(nodes: Array<SceneNode>): Array<TextNode> {
  const result: Array<TextNode> = []
  for (const node of nodes) {
    traverseNode(node, function (node: SceneNode) {
      if (node.type === 'TEXT') {
        result.push(node)
      }
    })
  }
  return result
}
