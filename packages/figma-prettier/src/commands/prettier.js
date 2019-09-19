import cleanNode from '../utilities/clean-node'

export default function (figma) {
  const selection = figma.currentPage.selection
  const nodes = selection.length > 0 ? selection : figma.root.children
  for (const node of nodes) {
    cleanNode(node)
  }
  figma.closePlugin()
}
