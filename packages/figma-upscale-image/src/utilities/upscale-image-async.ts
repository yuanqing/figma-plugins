import Upscaler from 'upscaler'

import { ImageAttributes } from './types'

export async function upscaleImageAsync(
  image: ImageAttributes,
  scale: number,
  parentElement: HTMLElement,
  upscaler: Upscaler
): Promise<ImageAttributes> {
  const imageElement = await createImageElementAsync(
    URL.createObjectURL(new Blob([image.bytes])),
    image.width,
    image.height
  )
  const upscaledImage = (await upscaler.upscale(imageElement)) as string
  const width = image.width * scale
  const height = image.height * scale
  const upscaledImageElement = await createImageElementAsync(
    upscaledImage,
    width,
    height
  )
  const bytes = await readImageElementBytesAsync(
    upscaledImageElement,
    parentElement
  )
  return {
    bytes,
    height,
    id: image.id,
    width
  }
}

async function createImageElementAsync(
  src: string,
  width: number,
  height: number
): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    const imageElement = new Image()
    imageElement.onload = function (): void {
      resolve(imageElement)
    }
    imageElement.width = width
    imageElement.height = height
    imageElement.onerror = reject
    imageElement.src = src
  })
}

async function readImageElementBytesAsync(
  imageElement: HTMLImageElement,
  parentElement: HTMLElement
): Promise<Uint8Array> {
  const canvasElement = createCanvasElement(
    imageElement.width,
    imageElement.height,
    parentElement
  )
  ;(canvasElement.getContext('2d') as CanvasRenderingContext2D).drawImage(
    imageElement,
    0,
    0
  )
  return new Promise(function (resolve, reject) {
    canvasElement.toBlob(function (blob) {
      const reader = new FileReader()
      reader.onload = function (): void {
        resolve(new Uint8Array(reader.result as ArrayBuffer))
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(blob as Blob)
    })
  })
}

function createCanvasElement(
  width: number,
  height: number,
  parentElement: HTMLElement
): HTMLCanvasElement {
  const canvasElement = document.createElement('canvas')
  parentElement.appendChild(canvasElement)
  canvasElement.width = width
  canvasElement.height = height
  canvasElement.style.cssText = 'position: absolute;'
  return canvasElement
}
