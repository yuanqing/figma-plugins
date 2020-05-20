export function getScope(): string {
  return figma.currentPage.selection.length === 0 ? 'on page' : 'in selection'
}
