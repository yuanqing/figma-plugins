import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'
import { resetInstanceSize } from './utilities/reset-instance-size'

export default async function () {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select an instance'))
    return
  }
  const instances = figma.currentPage.selection.filter(function (layer) {
    return layer.type === 'INSTANCE'
  })
  if (instances.length === 0) {
    figma.closePlugin(formatErrorMessage('No instances in selection'))
    return
  }
  let count = 0
  for (const instance of instances) {
    if (resetInstanceSize(instance) === true) {
      count++
    }
  }
  if (count === 0) {
    figma.closePlugin('No change to instance size')
    return
  }
  figma.currentPage.selection = instances
  figma.closePlugin(
    formatSuccessMessage(
      `Reset the size of ${count} ${pluralize(count, 'instance')}`
    )
  )
}
