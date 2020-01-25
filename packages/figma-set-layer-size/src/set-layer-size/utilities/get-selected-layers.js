import { extractAttributes } from '@create-figma-plugin/utilities'

export function getSelectedLayers () {
  return extractAttributes(figma.currentPage.selection, [
    'id',
    'width',
    'height'
  ])
}
