import { isWithinInstanceNode } from '@create-figma-plugin/utilities'

export function ungroupSingleNodeGroup(node: SceneNode): boolean {
  if (
    isSingleLayerGroup(node) === false ||
    isWithinInstanceNode(node) === true
  ) {
    return false
  }
  const parent = node.parent
  if (parent === null) {
    return false
  }
  const index = parent.children.indexOf(node)
  if ('children' in node) {
    const child = node.children[0]
    const selection = figma.currentPage.selection
    if (selection.indexOf(node) !== -1) {
      // Replace the removed `node` in `selection` with the `child`
      const newSelection = selection.filter(function ({ id }) {
        return id !== node.id
      })
      newSelection.push(child)
      figma.currentPage.selection = newSelection
    }
    parent.insertChild(index, child)
    return true
  }
  return false
}

function isSingleLayerGroup(node: SceneNode): boolean {
  return (
    node.type === 'GROUP' &&
    node.children.length === 1 &&
    node.backgrounds.length === 0 &&
    node.blendMode === 'PASS_THROUGH' &&
    'constraints' in node === false &&
    node.effects.length === 0 &&
    node.exportSettings.length === 0
  )
}
