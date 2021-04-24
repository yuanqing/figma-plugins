import { EventHandler } from '@create-figma-plugin/utilities'

export type Scale = 2 | 3 | 4

export type ImageNodeAttributes = {
  width: number
  height: number
  id: string
  bytes: Uint8Array
}

export type Settings = {
  scale: Scale
}
export type UpscaleImageProps = Settings & {
  hasSelection: boolean
}
export type FormState = UpscaleImageProps

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (hasSelection: boolean) => void
}

export interface UpscaleImagesRequestHandler extends EventHandler {
  name: 'UPSCALE_IMAGES_REQUEST'
  handler: (images: Array<ImageNodeAttributes>, scale: Scale) => void
}
export interface UpscaleImagesResultHandler extends EventHandler {
  name: 'UPSCALE_IMAGES_RESULT'
  handler: (image: Array<ImageNodeAttributes>) => void
}
