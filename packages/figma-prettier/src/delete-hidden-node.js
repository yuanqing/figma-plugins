import whitelistRegex from './whitelist-regex'

export default function (node) {
  if (whitelistRegex.test(node.name)) {
    return
  }
  if (node.visible === false) {
    node.remove()
  }
}
