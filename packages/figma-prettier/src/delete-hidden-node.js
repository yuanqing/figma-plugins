export default function (node) {
  if (node.visible === false) {
    node.remove()
  }
}
