import { loadFontsAsync } from '@create-figma-plugin/utilities'

export async function setTextAsync(
  nodes: Array<TextNode>,
  text: string
): Promise<void> {
  await loadFontsAsync(nodes)
  for (const node of nodes) {
    node.characters = text
  }
}
