import { smartSortChildNodes } from './smart-sort-child-nodes'

export function smartSortNodes(
  nodes: Array<SceneNode>
):
  | null
  | Array<SceneNode>
  | { fixedNodes: Array<SceneNode>; scrollingNodes: Array<SceneNode> } {
  const parent = nodes[0].parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  if (
    'layoutMode' in parent &&
    (parent.layoutMode === 'HORIZONTAL' || parent.layoutMode === 'VERTICAL')
  ) {
    return null
  }
  const ids = nodes.map(function ({ id }) {
    return id
  })
  return smartSortChildNodes(parent as PageNode | SceneNode, ids)
}
