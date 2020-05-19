export function getScope() {
  return figma.currentPage.selection.length === 0 ? 'on page' : 'in selection'
}
