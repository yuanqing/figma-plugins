import { isValidNumericInput } from '@create-figma-plugin/utilities/src/number'
import { getPlugin } from './get-plugin'
import { parseCommandString } from './parse-command-string'
import { NUMBER } from './argument-types'

export function validateCommandString (commandString) {
  const { shorthand, values } = parseCommandString(commandString)
  if (shorthand === null) {
    return false
  }
  const validate = getPlugin(shorthand).validate
  if (typeof validate === 'function') {
    return validate(values)
  }
  let result = true
  values.forEach(function (value, index) {
    const argumentType = validate[index]
    if (
      typeof argumentType === 'undefined' ||
      (argumentType === NUMBER && isValidNumericInput(value) === false)
    ) {
      result = false
    }
  })
  return result
}
