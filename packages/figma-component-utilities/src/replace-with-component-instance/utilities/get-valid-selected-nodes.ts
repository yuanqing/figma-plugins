import {
  extractAttributes,
  isWithinInstance
} from '@create-figma-plugin/utilities'

import { NodeAttributes } from './types'

export function getValidSelectedNodes(): Array<NodeAttributes> {
  const nodes = figma.currentPage.selection.filter(function (node) {
    return isWithinInstance(node) === false
  })
  return extractAttributes(nodes, ['id', 'name'])
}
