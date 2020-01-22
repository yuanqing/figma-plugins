import {
  addEventListener,
  extractAttributes,
  formatSuccessMessage,
  onSelectionChange,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { getPlugin } from './utilities/get-plugin'

export default async function () {
  addEventListener('EXECUTE_PLUGIN', function ({ shorthand, value }) {
    const result = getPlugin(shorthand).command(value)
    if (result !== null) {
      figma.notify(formatSuccessMessage(result.successMessage), {
        timeout: 300
      })
    }
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', {
      selectedLayers: getSelectedLayers()
    })
  })
  showUI({ width: 240, height: 243 }, { selectedLayers: getSelectedLayers() })
}

function getSelectedLayers () {
  return extractAttributes(figma.currentPage.selection, ['id', 'name'])
}
