/* global figma */

export function getAllTopLevelFrames () {
  return figma.currentPage.children.filter(function ({ type }) {
    return type === 'FRAME'
  })
}
