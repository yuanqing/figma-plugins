/* global figma */

export function getAllTopLevelLayers () {
  return figma.currentPage.children.filter(function ({ type }) {
    return type === 'COMPONENT' || type === 'FRAME'
  })
}
