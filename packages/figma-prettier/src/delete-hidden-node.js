import whitelistRegex from './whitelist-regex'

export function deleteHiddenNode (node) {
  if (whitelistRegex.test(node.name)) {
    return
  }
  if (node.visible === false) {
    node.remove()
  }
}
