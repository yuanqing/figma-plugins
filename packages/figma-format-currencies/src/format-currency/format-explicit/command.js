import { commandFactory } from '../command-factory'

export default commandFactory(function (scope) {
  return `Set currencies ${scope} to Explicit format`
})
