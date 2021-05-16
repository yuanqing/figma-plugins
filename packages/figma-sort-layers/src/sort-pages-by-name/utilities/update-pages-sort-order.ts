import { compareStringArrays } from '@create-figma-plugin/utilities'

import { extractNodeIds } from '../../utilities/extract-node-ids.js'

export function updatePagesSortOrder(pages: Array<PageNode>): boolean {
  const document = figma.root
  const idsBefore = extractNodeIds(document.children.slice())
  const insertIndex = document.children.length
  pages.forEach(function (node) {
    document.insertChild(insertIndex, node)
  })
  const idsAfter = extractNodeIds(document.children.slice())
  return compareStringArrays(idsBefore, idsAfter) === false
}
