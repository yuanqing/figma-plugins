export function resetTextNodeNames(nodes: Array<TextNode>): void {
  for (const node of nodes) {
    node.autoRename = true
  }
}
