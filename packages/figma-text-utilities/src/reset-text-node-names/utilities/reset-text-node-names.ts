export function resetTextNodeNames(nodes: Array<TextNode>) {
  for (const node of nodes) {
    node.autoRename = true
  }
}
