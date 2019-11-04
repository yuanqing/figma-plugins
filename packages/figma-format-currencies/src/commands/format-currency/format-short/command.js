import { commandFactory } from '../command-factory'

export default commandFactory(function (scope) {
  return `Changed currencies ${scope} to Short format`
})
