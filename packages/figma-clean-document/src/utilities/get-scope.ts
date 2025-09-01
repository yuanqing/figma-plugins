import { Scope } from './types.js'

export function getScope(): Scope {
  return figma.currentPage.selection.length === 0 ? 'on page' : 'in selection'
}
