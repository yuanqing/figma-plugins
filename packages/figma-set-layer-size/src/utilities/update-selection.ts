export function updateSelection (nodes: Array<{ id: string }>): void {
  const selection: Array<SceneNode> = []
  for (const { id } of nodes) {
    const node = figma.getNodeById(id) as SceneNode
    selection.push(node)
  }
  figma.currentPage.selection = selection
}
