/* global figma */

import {
  addCommandEventListener,
  loadSettings,
  saveSettings,
  showUi
} from '@create-figma-plugin/utilities'

export default async function () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin('Select one or more layers')
    return
  }
  const settings = (await loadSettings()) || {
    horizontalOffset: 0,
    verticalOffset: 0
  }
  addCommandEventListener('MOVE_LAYERS', async function (settings) {
    await saveSettings(settings)
    const { horizontalOffset, verticalOffset } = settings
    if (horizontalOffset === 0 && verticalOffset === 0) {
      figma.closePlugin()
      return
    }
    for (const node of selection) {
      node.x += horizontalOffset
      node.y += verticalOffset
    }
    figma.closePlugin(
      `✔ Moved selected layer${selection.length === 1 ? '' : 's'}`
    )
  })
  addCommandEventListener('CANCEL', function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 124, data: settings })
}
