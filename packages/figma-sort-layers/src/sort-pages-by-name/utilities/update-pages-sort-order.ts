import { compareArrays } from '@create-figma-plugin/utilities'

export function updatePagesSortOrder(pages: Array<PageNode>): boolean {
  const document = figma.root
  const idsBefore = document.children.map(function ({ id }) {
    return id
  })
  const insertIndex = document.children.length
  pages.forEach(function (node) {
    document.insertChild(insertIndex, node)
  })
  const idsAfter = document.children.map(function ({ id }) {
    return id
  })
  return compareArrays(idsBefore, idsAfter) === false
}
