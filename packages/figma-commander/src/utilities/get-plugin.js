import { plugins } from '../plugins/plugins'

const object = Object.keys(plugins).reduce(function (result, key) {
  const plugin = plugins[key]
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
