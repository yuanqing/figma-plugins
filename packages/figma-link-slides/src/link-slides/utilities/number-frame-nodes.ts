export function numberFrameNodes(
  nodes: Array<FrameNode | ComponentNode>
): void {
  let i = 1
  const targetLength = `${nodes.length}`.length
  for (const node of nodes.slice().reverse()) {
    node.name = `${i}`.padStart(targetLength, '0')
    i += 1
  }
}
