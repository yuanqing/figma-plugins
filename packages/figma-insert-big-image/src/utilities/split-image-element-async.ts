/* global FileReader */
import { ImageAttributes } from '../types'

export async function splitImageElementAsync(
  image: HTMLImageElement,
  widths: Array<number>,
  heights: Array<number>
): Promise<Array<ImageAttributes>> {
  const parentElement = document.createElement('div')
  document.body.appendChild(parentElement)
  parentElement.style.cssText =
    'position: absolute; pointer-events: none; visibility: hidden; overflow: hidden;'
  const canvasElement = createCanvasElement(
    image.width,
    image.height,
    parentElement
  )
  const context = canvasElement.getContext('2d') as CanvasRenderingContext2D
  context.drawImage(image, 0, 0)
  const promises = []
  let y = 0
  for (const height of heights) {
    let x = 0
    for (const width of widths) {
      const imageData = context.getImageData(x, y, width, height)
      promises.push(
        encodeImageAsync(imageData, x, y, width, height, parentElement)
      )
      x += width
    }
    y += height
  }
  return Promise.all(promises.reverse())
}

async function encodeImageAsync(
  imageData: ImageData,
  x: number,
  y: number,
  width: number,
  height: number,
  parentElement: HTMLElement
): Promise<ImageAttributes> {
  const canvasElement = createCanvasElement(width, height, parentElement)
  ;(canvasElement.getContext('2d') as CanvasRenderingContext2D).putImageData(
    imageData,
    0,
    0
  )
  const result: ImageAttributes = await new Promise(function (resolve, reject) {
    canvasElement.toBlob(function (blob) {
      const reader = new FileReader()
      reader.onload = function (): void {
        resolve({
          bytes: new Uint8Array(reader.result as ArrayBuffer),
          height,
          width,
          x,
          y
        })
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(blob as Blob)
    })
  })
  parentElement.removeChild(canvasElement)
  return result
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
