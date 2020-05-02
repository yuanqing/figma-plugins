import {
  createImagePaint,
  insertBeforeLayer
} from '@create-figma-plugin/utilities'

export async function createImageLayerFromGroupAsync (group, resolution) {
  // Export the `group` as a PNG image at `2x` resolution.
  const exportSettings = {
    format: 'PNG',
    constraint: {
      type: 'SCALE',
      value: resolution
    }
  }
  const imageBytes = await group.exportAsync(exportSettings)

  // Convert `imageBytes` into an `ImagePaint` object.
  const imagePaint = createImagePaint(imageBytes)

  // Create a rectangle layer with the same dimensions and position as
  // the `group` layer.
  const layer = figma.createRectangle()
  insertBeforeLayer(layer, group)
  layer.resize(group.width, group.height)
  layer.x = group.x
  layer.y = group.y

  // Apply the `imagePaint` as a fill on the `layer`.
  layer.fills = [imagePaint]

  return layer
}
