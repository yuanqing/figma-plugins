export function arrangeGroups(groups, horizontalSpace, verticalSpace) {
  let x = 0
  for (const group of groups) {
    let y = 0
    let maxWidth = 0
    for (const { id } of group.layers) {
      const layer = figma.getNodeById(id) as SceneNode
      layer.x = x
      layer.y = y
      y = layer.y + layer.height + verticalSpace
      maxWidth = Math.max(maxWidth, layer.width)
    }
    x += maxWidth + horizontalSpace
  }
}
