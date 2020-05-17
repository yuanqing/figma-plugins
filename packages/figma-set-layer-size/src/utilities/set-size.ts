export function setSize (
  nodes: Array<{ id: string }>,
  width: null | number,
  height: null | number,
  resizeWithConstraints: boolean
): void {
  for (const { id } of nodes) {
    const node = figma.getNodeById(id) as SceneNode
    const newWidth = width === null ? node.width : width
    const newHeight = height === null ? node.height : height
    if (node.type === 'GROUP' || resizeWithConstraints === true) {
      node.resize(newWidth, newHeight)
    } else {
      node.resizeWithoutConstraints(newWidth, newHeight)
    }
  }
}
