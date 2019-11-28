/* global figma */

export function arrangeGroups (groups, horizontalSpace, verticalSpace) {
  let x = 0
  for (const key in groups) {
    let y = 0
    let maxWidth = 0
    for (const { id } of groups[key]) {
      const layer = figma.getNodeById(id)
      layer.x = x
      layer.y = y
      y += layer.y + layer.height + verticalSpace
      maxWidth = Math.max(maxWidth, layer.width)
    }
    x += maxWidth + horizontalSpace
  }
}
