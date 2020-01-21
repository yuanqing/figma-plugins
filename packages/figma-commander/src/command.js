import {
  addEventListener,
  onSelectionChange,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { getPlugin } from './utilities/get-plugin'

export default async function () {
  addEventListener('EXECUTE_PLUGIN', function ({ shorthand, value }) {
    getPlugin(shorthand).command(value)
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  onSelectionChange(function (selectedLayers) {
    triggerEvent('SELECTION_CHANGED', {
      hasSelection: selectedLayers.length > 0
    })
  })
  showUI(
    { width: 240, height: 243 },
    { hasSelection: figma.currentPage.selection.length !== 0 }
  )
}
