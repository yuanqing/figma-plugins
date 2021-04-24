import {
  getDocumentComponents,
  sortNodesByName
} from '@create-figma-plugin/utilities'

import { ComponentNodeAttributes } from './types'

export function getComponentNodes(): Array<ComponentNodeAttributes> {
  const components = sortNodesByName(getDocumentComponents()).reverse()
  return components.map(function (component: ComponentNode) {
    return {
      id: component.id,
      name: component.name,
      pageName: resolveComponentPageName(component)
    }
  })
}

function resolveComponentPageName(component: ComponentNode): string {
  let parent = component.parent
  while (parent !== null && parent.type !== 'PAGE') {
    parent = parent.parent
  }
  if (parent === null) {
    throw new Error('Component has no parent')
  }
  return parent.name
}
