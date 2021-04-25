import {
  extractAttributes,
  isWithinInstance
} from '@create-figma-plugin/utilities'

import { NodePlainObject } from './types'

export function getSelectedNodePlainObjects(): Array<NodePlainObject> {
  const nodes = figma.currentPage.selection.filter(function (node) {
    return isWithinInstance(node) === false
  })
  return extractAttributes(nodes, ['id', 'name'])
}
