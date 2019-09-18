import cleanNode from '../utilities/clean-node'

export default function (figma) {
  const selection = figma.currentPage.selection
  if (selection.length > 0) {
    for (const node of selection) {
      cleanNode(node)
    }
  } else {
    for (const pageNode of figma.root.children) {
      for (const node of pageNode.children) {
        cleanNode(node)
      }
    }
  }
  figma.closePlugin()
}
