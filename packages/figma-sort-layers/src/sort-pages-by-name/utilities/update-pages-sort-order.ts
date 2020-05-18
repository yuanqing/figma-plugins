import { compareArrays } from '@create-figma-plugin/utilities'

export function updatePagesSortOrder(pages: Array<PageNode>): boolean {
  const document = figma.root
  const ids = document.children.map(function({ id }) {
    return id
  })
  const insertIndex = computeInsertIndex(pages, ids)
  pages.forEach(function(node) {
    figma.root.insertChild(insertIndex, node)
  })
  const idsAfter = document.children.map(function({ id }) {
    return id
  })
  return compareArrays(ids, idsAfter) === false
}

function computeInsertIndex(
  nodes: Array<PageNode>,
  ids: Array<string>
): number {
  let insertIndex = -1
  nodes.forEach(function(node) {
    const index = ids.indexOf(node.id)
    if (index > insertIndex) {
      insertIndex = index
    }
  })
  return insertIndex + 1
}
