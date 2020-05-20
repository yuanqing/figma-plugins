import {
  extractAttributes,
  getDocumentComponents,
  sortNodesByName
} from '@create-figma-plugin/utilities'

import { Component } from '../types'

export function getComponents(): Array<Component> {
  const components = sortNodesByName(getDocumentComponents())
  return extractAttributes(components, ['id', 'name']) as Array<Component>
}
