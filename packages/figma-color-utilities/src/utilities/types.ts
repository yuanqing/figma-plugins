import { EventHandler } from '@create-figma-plugin/utilities'

export type MainFactoryOptions = {
  successMessagePrefix: string
  transformRgb: (rgb: RGB) => RGB
}
export type UiFactoryOptions = {
  transformImageData: (imageData: ImageData) => ImageData
}

export interface TransformImageColorsRequest extends EventHandler {
  name: 'TRANSFORM_IMAGE_COLORS_REQUEST'
  handler: (options: { bytes: Uint8Array }) => void
}
export interface TransformImageColorsResult extends EventHandler {
  name: 'TRANSFORM_IMAGE_COLORS_RESULT'
  handler: (options: { bytes: Uint8Array }) => void
}
