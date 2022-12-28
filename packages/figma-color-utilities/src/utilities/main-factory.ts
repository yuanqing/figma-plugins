import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  once,
  pluralize,
  showUI,
  traverseNodeAsync
} from '@create-figma-plugin/utilities'

import {
  MainFactoryOptions,
  TransformImageColorsRequest,
  TransformImageColorsResult
} from './types.js'

export function mainFactory({
  successMessagePrefix,
  transformRgb
}: MainFactoryOptions) {
  return async function (): Promise<void> {
    if (figma.currentPage.selection.length === 0) {
      figma.closePlugin(formatErrorMessage('Select one or more layers'))
      return
    }
    showUI({ height: 0, visible: false, width: 0 })
    let count = 0
    async function transformNodeAsync(node: SceneNode): Promise<void> {
      let didChange = false
      if (!('fills' in node)) {
        return
      }
      if (node.fills === figma.mixed) {
        return
      }
      const newFills: Array<Paint> = []
      for (const fill of node.fills) {
        switch (fill.type) {
          case 'SOLID': {
            newFills.push({
              ...fill,
              color: transformRgb(fill.color)
            })
            didChange = true
            break
          }
          case 'GRADIENT_LINEAR':
          case 'GRADIENT_RADIAL':
          case 'GRADIENT_ANGULAR':
          case 'GRADIENT_DIAMOND': {
            const newGradientStops: Array<ColorStop> = []
            for (const gradientStop of fill.gradientStops) {
              const { r, g, b, a } = gradientStop.color
              newGradientStops.push({
                ...gradientStop,
                color: {
                  ...transformRgb({ b, g, r }),
                  a
                }
              })
            }
            newFills.push({
              ...fill,
              gradientStops: newGradientStops
            })
            didChange = true
            break
          }
          case 'IMAGE': {
            if (fill.imageHash === null) {
              continue
            }
            const image = figma.getImageByHash(fill.imageHash)
            if (image === null) {
              continue
            }
            const bytes = await image.getBytesAsync()
            await new Promise<void>(function (resolve) {
              once<TransformImageColorsResult>(
                'TRANSFORM_IMAGE_COLORS_RESULT',
                function (options: { bytes: Uint8Array }) {
                  const { bytes } = options
                  newFills.push({
                    ...fill,
                    imageHash: figma.createImage(bytes).hash
                  })
                  didChange = true
                  resolve()
                }
              )
              emit<TransformImageColorsRequest>(
                'TRANSFORM_IMAGE_COLORS_REQUEST',
                { bytes }
              )
            })
            break
          }
        }
      }
      if (didChange === true) {
        count += 1
      }
      node.fills = newFills
    }
    const selection = figma.currentPage.selection.slice()
    for (const node of selection) {
      await traverseNodeAsync(node, transformNodeAsync)
    }
    figma.closePlugin(
      formatSuccessMessage(
        `${successMessagePrefix} ${count} ${pluralize(count, 'layer')}`
      )
    )
  }
}
