import {
  formatErrorMessage,
  formatSuccessMessage,
  insertBeforeLayer,
  mapNumberToWord,
  pluralize
} from '@create-figma-plugin/utilities'
import { OFFSET } from '../constants'

export default async function () {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select a component'))
    return
  }
  const components = figma.currentPage.selection.filter(function (layer) {
    return layer.type === 'COMPONENT'
  })
  if (components.length === 0) {
    figma.closePlugin(formatErrorMessage('No components in selection'))
    return
  }
  const newSelection = []
  for (const component of components) {
    const clone = component.clone()
    clone.x = component.x + OFFSET
    clone.y = component.y + OFFSET
    insertBeforeLayer(clone, component)
    newSelection.push(clone)
  }
  figma.currentPage.selection = newSelection
  figma.closePlugin(
    formatSuccessMessage(
      `Copied ${pluralize(
        components.length,
        'component',
        `${mapNumberToWord(components.length)} components`
      )}`
    )
  )
}
