export function deleteLinks(nodes: Array<FrameNode | ComponentNode>): void {
  for (const node of nodes) {
    node.reactions = []
  }
}
