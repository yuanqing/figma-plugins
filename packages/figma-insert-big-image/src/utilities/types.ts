import { EventHandler } from '@create-figma-plugin/utilities'

export type ImageNodePlainObject = {
  bytes: Uint8Array
  x: number
  y: number
  width: number
  height: number
}

export type Settings = {
  insertAs2x: boolean
}
export type InsertBigImageProps = Settings

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}

export interface InsertBigImageHandler extends EventHandler {
  name: 'INSERT_BIG_IMAGE'
  handler: (
    images: Array<ImageNodePlainObject>,
    options: {
      name: string
      insertAs2x: boolean
      done: boolean
    }
  ) => void
}
