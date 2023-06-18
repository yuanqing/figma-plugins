import {
  createCanvasElementFromBytesAsync,
  emit,
  on,
  readBytesFromCanvasElementAsync
} from '@create-figma-plugin/utilities'

import {
  TransformImageColorsRequest,
  TransformImageColorsResult,
  UiFactoryOptions
} from './types.js'

export function uiFactory({ transformImageData }: UiFactoryOptions) {
  return function (): void {
    on<TransformImageColorsRequest>(
      'TRANSFORM_IMAGE_COLORS_REQUEST',
      async function (options: { bytes: Uint8Array }) {
        const { bytes } = options
        const canvasElement = await createCanvasElementFromBytesAsync(bytes)
        const context = canvasElement.getContext(
          '2d'
        ) as CanvasRenderingContext2D
        const imageData = context.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        const transformedImageData = transformImageData(imageData)
        context.putImageData(transformedImageData, 0, 0)
        emit<TransformImageColorsResult>('TRANSFORM_IMAGE_COLORS_RESULT', {
          bytes: await readBytesFromCanvasElementAsync(canvasElement)
        })
      }
    )
  }
}
