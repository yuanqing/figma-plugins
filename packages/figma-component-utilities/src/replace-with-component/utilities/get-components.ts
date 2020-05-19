import {
  getDocumentComponents,
  sortNodesByName
} from '@create-figma-plugin/utilities'

export function getComponents() {
  return sortNodesByName(getDocumentComponents())
}
