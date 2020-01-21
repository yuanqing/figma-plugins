import { plugins } from '../plugins/plugins'

const object = plugins.reduce(function (result, plugin) {
  result[plugin.shorthand] = plugin
  return result
}, {})

export function getPlugin (shorthand) {
  const plugin = object[shorthand]
  if (typeof plugin === 'undefined') {
    return null
  }
  return plugin
}
