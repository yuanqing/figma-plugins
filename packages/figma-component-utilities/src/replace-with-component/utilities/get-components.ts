import {
  extractAttributes,
  getDocumentComponents,
  sortNodesByName
} from '@create-figma-plugin/utilities'

import { ComponentNodeAttributes } from '../types'

export function getComponents(): Array<ComponentNodeAttributes> {
  const components = sortNodesByName(getDocumentComponents())
  return extractAttributes<ComponentNodeAttributes>(components, ['id', 'name'])
}
