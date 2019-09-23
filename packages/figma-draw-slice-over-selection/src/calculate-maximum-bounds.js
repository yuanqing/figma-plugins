export function calculateMaximumBounds (nodes) {
  let maximumBounds = [
    {
      x: Number.MAX_VALUE,
      y: Number.MAX_VALUE
    },
    {
      x: -1 * Number.MAX_VALUE,
      y: -1 * Number.MAX_VALUE
    }
  ]
  for (const node of nodes) {
    const x = node.absoluteTransform[0][2]
    const y = node.absoluteTransform[1][2]
    maximumBounds = [
      {
        x: Math.min(maximumBounds[0].x, x),
        y: Math.min(maximumBounds[0].y, y)
      },
      {
        x: Math.max(maximumBounds[1].x, x + node.width),
        y: Math.max(maximumBounds[1].y, y + node.height)
      }
    ]
  }
  return maximumBounds
}
