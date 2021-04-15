import {
  extractAttributes,
  isWithinInstance
} from '@create-figma-plugin/utilities'

import { NodeAttributes } from '../types'

export function getSelection(): Array<NodeAttributes> {
  const nodes = figma.currentPage.selection.filter(function (node) {
    return isWithinInstance(node) === false
  })
  return extractAttributes<NodeAttributes>(nodes, ['id', 'name'])
}
