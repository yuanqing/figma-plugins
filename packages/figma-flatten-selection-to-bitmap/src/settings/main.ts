import {
  formatSuccessMessage,
  saveSettingsAsync
} from '@create-figma-plugin/utilities'

import { settingsKey } from '../utilities/settings.js'
import { Resolution } from '../utilities/types.js'

const resolutions = ['2x', '3x', '4x', '8x', '10x']

export default async function (): Promise<void> {
  figma.parameters.on(
    'input',
    function (
      parameterValues: ParameterValues,
      key: string,
      suggestionResults: SuggestionResults
    ) {
      const value = parameterValues[key]
      suggestionResults.setSuggestions(
        resolutions.filter(function (resolution: string): boolean {
          return resolution.indexOf(value) !== -1
        })
      )
    }
  )
  figma.on('run', async function (runEvent?: RunEvent) {
    if (typeof runEvent === 'undefined') {
      throw new Error('`runEvent` is `undefined`')
    }
    if (typeof runEvent.parameters === 'undefined') {
      throw new Error('`runEvent.parameters` is `undefined`')
    }
    const resolution = parseFloat(runEvent.parameters.resolution) as Resolution
    await saveSettingsAsync({ resolution }, settingsKey)
    figma.closePlugin(formatSuccessMessage('Saved settings'))
  })
}
