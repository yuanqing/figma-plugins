import { evaluateNumericExpression } from '@create-figma-plugin/utilities'
import { NUMBER } from './argument-types'

export function castValues (values, argumentTypes) {
  const result = []
  values.forEach(function (value, index) {
    if (argumentTypes[index] === NUMBER) {
      const number = evaluateNumericExpression(value)
      if (typeof number === 'undefined') {
        return
      }
      result.push(number)
    }
    result.push(value)
  })
  return result
}
