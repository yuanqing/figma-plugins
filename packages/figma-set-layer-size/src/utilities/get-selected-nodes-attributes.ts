import {
  extractAttributes,
  isWithinInstance
} from '@create-figma-plugin/utilities'

export function getSelectedNodesAttributes (): Array<{ [key: string]: any }> {
  const nodes = figma.currentPage.selection.filter(function (node) {
    return isWithinInstance(node) === false
  })
  return extractAttributes(nodes, ['id', 'width', 'height'])
}
