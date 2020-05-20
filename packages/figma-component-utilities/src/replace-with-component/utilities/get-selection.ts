import {
  extractAttributes,
  isWithinInstance
} from '@create-figma-plugin/utilities'

import { Layer } from '../types'

export function getSelection(): Array<Layer> {
  const nodes = figma.currentPage.selection.filter(function (node) {
    return isWithinInstance(node) === false
  })
  return extractAttributes(nodes, ['id', 'name']) as Array<Layer>
}
