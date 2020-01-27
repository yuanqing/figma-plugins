export function createImageLayer (
  [bytes, x, y, width, height],
  xOffset,
  yOffset,
  insertAs2x
) {
  const rectangle = figma.createRectangle()
  rectangle.name = 'Image'
  rectangle.x = (insertAs2x === true ? x / 2 : x) + xOffset
  rectangle.y = (insertAs2x === true ? y / 2 : y) + yOffset
  rectangle.resize(
    insertAs2x === true ? width / 2 : width,
    insertAs2x === true ? height / 2 : height
  )
  const image = figma.createImage(bytes)
  rectangle.fills = [
    {
      type: 'IMAGE',
      visible: true,
      opacity: 1,
      blendMode: 'NORMAL',
      scaleMode: 'FILL',
      imageTransform: [
        [1, 0, 0],
        [0, 1, 0]
      ],
      scalingFactor: 0.5,
      filters: {
        exposure: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        tint: 0,
        highlights: 0,
        shadows: 0
      },
      imageHash: image.hash
    }
  ]
  return rectangle
}
