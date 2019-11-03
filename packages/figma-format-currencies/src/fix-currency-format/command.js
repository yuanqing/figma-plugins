import { commandFactory } from '../factory/command-factory'

export default commandFactory(function (scope) {
  return `Fixed currrency formatted ${scope}`
})
