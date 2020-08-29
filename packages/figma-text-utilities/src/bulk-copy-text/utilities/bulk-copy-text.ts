import { emit, once, showUI } from '@create-figma-plugin/utilities'

export function bulkCopyText(nodes: Array<TextNode>): Promise<void> {
  const text = nodes
    .map(function (node: TextNode) {
      return node.characters
    })
    .join('\n')
    .replace(/\n+/g, '\n')
  return new Promise(function (resolve) {
    once('COPY_TEXT_SUCCESS', function () {
      figma.ui.close()
      resolve()
    })
    showUI({ height: 0, width: 0 })
    emit('COPY_TEXT_REQUEST', { text })
  })
}
