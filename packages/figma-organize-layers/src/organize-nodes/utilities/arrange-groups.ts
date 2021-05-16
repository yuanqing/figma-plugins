import { Group } from './types.js'

export function arrangeGroups(
  groups: Array<Group<SceneNode>>,
  options: { horizontalSpace: number; verticalSpace: number }
): void {
  const { horizontalSpace, verticalSpace } = options
  let x = 0
  for (const group of groups) {
    let y = 0
    let maxWidth = 0
    for (const { id } of group.nodes) {
      const layer = figma.getNodeById(id) as SceneNode
      layer.x = x
      layer.y = y
      y = layer.y + layer.height + verticalSpace
      maxWidth = Math.max(maxWidth, layer.width)
    }
    x += maxWidth + horizontalSpace
  }
}
