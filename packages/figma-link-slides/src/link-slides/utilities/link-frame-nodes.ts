export function linkFrameNodes(nodes: Array<FrameNode | ComponentNode>): void {
  const reversed = nodes.slice().reverse()
  let i = 0
  while (i < reversed.length - 1) {
    const node = reversed[i]
    const nextNode = reversed[i + 1]
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
