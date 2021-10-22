import { loadFontsAsync, traverseNode } from '@create-figma-plugin/utilities'

import { Settings } from './types'

export async function findAndReplaceAsync(
  nodes: Array<SceneNode>,
  options: Settings
): Promise<number> {
  const { caseSensitive, findString, useRegularExpression, replaceString } =
    options
  const textNodes = filterTextNodes(nodes)
  await loadFontsAsync(textNodes)
  let count = 0
  if (useRegularExpression === false) {
    for (const textNode of textNodes) {
      const split = textNode.characters.split(findString)
      if (split.length > 1) {
        count += split.length - 1
        textNode.characters = split.join(replaceString)
      }
    }
    return count
  }
  const regex = new RegExp(findString, caseSensitive === true ? 'g' : 'ig')
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
