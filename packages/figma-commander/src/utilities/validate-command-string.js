import { isValidNumericInput } from '@create-figma-plugin/utilities'
import { getPlugin } from './get-plugin'
import { parseCommandString } from './parse-command-string'
import { NUMBER } from './argument-types'

export function validateCommandString (commandString) {
  const { shorthand, values } = parseCommandString(commandString)
  if (shorthand === null) {
    return false
  }
  const { argumentTypes } = getPlugin(shorthand)
  if (values.length > argumentTypes.length) {
    return false
  }
  if (
    values.length === argumentTypes.length &&
    commandString[commandString.length - 1] === ' '
  ) {
    return false
  }
  if (typeof argumentTypes === 'function') {
    return argumentTypes(values)
  }
  let result = true
  values.forEach(function (value, index) {
    const argumentType = argumentTypes[index]
    if (argumentType === NUMBER && isValidNumericInput(value) === false) {
      result = false
    }
  })
  return result
}
