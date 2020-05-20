import {
  extractAttributes,
  isWithinInstance
} from '@create-figma-plugin/utilities'

import { Layer } from '../types'

export function getSelectedNodesAttributes(): Array<Layer> {
  const nodes = figma.currentPage.selection.filter(function (node) {
    return isWithinInstance(node) === false
  })
  return extractAttributes(nodes, ['id', 'width', 'height']) as Array<Layer>
}
