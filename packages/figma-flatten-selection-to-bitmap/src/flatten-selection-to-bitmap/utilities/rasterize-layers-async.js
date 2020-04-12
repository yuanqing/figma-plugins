import {
  createImagePaint,
  insertBeforeLayer
} from '@create-figma-plugin/utilities'

export async function rasterizeLayersAsync (layers, resolution) {
  const group = createGroupFromLayers(layers)
  const image = await createImageLayerFromGroupAsync(group, resolution)
  insertBeforeLayer(image, group)
  image.x = group.x
  image.y = group.y
  group.remove()
  return image
}

function createGroupFromLayers (layers) {
  const parent = layers[0].parent
  const index = parent.children.indexOf(layers[0])
  const count = layers.length
  const group = figma.group(layers, parent)
  parent.insertChild(index + 1 - count, group) // re-insert `group` at the index of `layers[0]`
  return group
}

async function createImageLayerFromGroupAsync (group, resolution) {
  const rectangle = figma.createRectangle()
  rectangle.name =
    group.children.length === 1 ? group.children[0].name : 'Image'
  rectangle.resize(group.width, group.height)
  const bytes = await group.exportAsync({
    format: 'PNG',
    constraint: {
      type: 'SCALE',
      value: resolution
    }
  })
  rectangle.fills = [createImagePaint(bytes)]
  return rectangle
}
