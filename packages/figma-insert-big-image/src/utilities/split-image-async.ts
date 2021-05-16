/* global FileReader */
import { ImageNodePlainObject } from './types.js'

// This function uses the DOM and must be called from the UI context
export async function splitImageAsync(
  object: Blob | File
): Promise<Array<ImageNodePlainObject>> {
  const imageElement = await createImageElementFromFileAsync(object)
  const widths = computeDimensions(imageElement.width)
  const heights = computeDimensions(imageElement.height)
  return splitImageElementAsync(imageElement, widths, heights)
}

async function createImageElementFromFileAsync(
  object: Blob | File
): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    const imageElement = new Image()
    imageElement.onload = function (): void {
      resolve(imageElement)
    }
    imageElement.onerror = reject
    imageElement.src = URL.createObjectURL(object)
  })
}

const MAX_DIMENSION = 4096

// Splits `dimensions` into an array of numbers that are each smaller than `MAX_DIMENSION`
function computeDimensions(dimension: number): Array<number> {
  if (dimension <= MAX_DIMENSION) {
    return [dimension]
  }
  let pieces = 1
  let currentDimension
  do {
    pieces++
    currentDimension = Math.floor(dimension / pieces)
  } while (currentDimension >= MAX_DIMENSION)
  const remainder = dimension % currentDimension
  const result = Array(pieces - 1).fill(currentDimension)
  result.push(currentDimension + remainder)
  return result
}

async function splitImageElementAsync(
  image: HTMLImageElement,
  widths: Array<number>,
  heights: Array<number>
): Promise<Array<ImageNodePlainObject>> {
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
): Promise<ImageNodePlainObject> {
  const canvasElement = createCanvasElement(width, height, parentElement)
  ;(canvasElement.getContext('2d') as CanvasRenderingContext2D).putImageData(
    imageData,
    0,
    0
  )
  const result: ImageNodePlainObject = await new Promise(function (
    resolve,
    reject
  ) {
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
