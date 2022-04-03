export function linkFrameNodes(nodes: Array<FrameNode | ComponentNode>): void {
  let i = 0
  while (i < nodes.length - 1) {
    const node = nodes[i]
    const nextNode = nodes[i + 1]
    const reactions: Array<Reaction> = [
      {
        action: {
          destinationId: nextNode.id,
          navigation: 'NAVIGATE',
          preserveScrollPosition: false,
          transition: null,
          type: 'NODE'
        },
        trigger: {
          type: 'ON_CLICK'
        }
      }
    ]
    node.reactions = reactions
    i += 1
  }
}
