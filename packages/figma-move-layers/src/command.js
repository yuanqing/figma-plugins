/* global figma */
import {
  addEventListener,
  loadSettings,
  saveSettings,
  showUi
} from '@create-figma-plugin/utilities'

export default async function () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin('✘ \u00a0 Select one or more layers')
    return
  }
  const settings = (await loadSettings()) || {
    horizontalOffset: 0,
    verticalOffset: 0
  }
  addEventListener('MOVE_LAYERS', async function (settings) {
    await saveSettings(settings)
    const { horizontalOffset, verticalOffset } = settings
    if (horizontalOffset === 0 && verticalOffset === 0) {
      figma.closePlugin()
      return
    }
    for (const layer of selection) {
      layer.x += horizontalOffset
      layer.y += verticalOffset
    }
    figma.closePlugin(
      `✔ \u00a0 Moved selected layer${selection.length === 1 ? '' : 's'}`
    )
  })
  addEventListener('CLOSE', async function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 128, data: settings })
}
