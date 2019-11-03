import { commandFactory } from '../factory/command-factory'

export default commandFactory(function (scope) {
  return `Set currencies ${scope} to Explicit format`
})
