import { whitelistRegex } from './whitelist-regex'

export function deleteHiddenLayer (layer) {
  if (whitelistRegex.test(layer.name)) {
    return false
  }
  if (layer.visible === false) {
    layer.remove()
    return true
  }
  return false
}
