import { EventHandler } from '@create-figma-plugin/utilities'

export type ImageAttributes = {
  bytes: Uint8Array
  x: number
  y: number
  width: number
  height: number
}

export type Settings = {
  insertAs2x: boolean
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}

export interface InsertBigImageHandler extends EventHandler {
  name: 'INSERT_BIG_IMAGE'
  handler: (
    images: Array<ImageAttributes>,
    options: Settings & {
      name: string
      done: boolean
    }
  ) => void
}
