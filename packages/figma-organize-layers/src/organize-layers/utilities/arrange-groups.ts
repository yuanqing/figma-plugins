import { Group } from '../../types'

export function arrangeGroups(
  groups: Array<Group>,
  horizontalSpace: number,
  verticalSpace: number
): void {
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
