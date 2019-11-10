import { commandFactory } from '../command-factory'

export default commandFactory(function (scope, locale) {
  return `Set locale of currencies ${scope} to ${locale}`
})
