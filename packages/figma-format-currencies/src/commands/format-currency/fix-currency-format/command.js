import { commandFactory } from '../command-factory'

export default commandFactory(function (scope) {
  return `Fixed currrency formatted ${scope}`
})
