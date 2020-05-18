/* global FileReader */

export async function splitImageAsync(image, widths, heights) {
  const parentElement = document.createElement('div')
  document.body.appendChild(parentElement)
  parentElement.style.cssText =
    'position: absolute; pointer-events: none; visibility: hidden; overflow: hidden;'
  const canvasElement = createCanvasElement(
    image.width,
    image.height,
    parentElement
  )
  const context = canvasElement.getContext('2d')
  context.drawImage(image, 0, 0)
  const promises = []
  let y = 0
  for (const height of heights) {
    let x = 0
    for (const width of widths) {
      const imageData = context.getImageData(x, y, width, height)
      promises.push(encodeImage(imageData, x, y, width, height, parentElement))
      x += width
    }
    y += height
  }
  document.body.removeChild(parentElement)
  return Promise.all(promises)
}

async function encodeImage(imageData, x, y, width, height, parentElement) {
  const canvasElement = createCanvasElement(width, height, parentElement)
  canvasElement.getContext('2d').putImageData(imageData, 0, 0)
  const result = await new Promise(function(resolve, reject) {
    canvasElement.toBlob(function(blob) {
      const reader = new FileReader()
      reader.onload = function() {
        resolve([
          new Uint8Array(reader.result as ArrayBuffer),
          x,
          y,
          width,
          height
        ])
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(blob)
    })
  })
  parentElement.removeChild(canvasElement)
  return result
}

function createCanvasElement(width, height, parentElement) {
  const canvasElement = document.createElement('canvas')
  parentElement.appendChild(canvasElement)
  canvasElement.width = width
  canvasElement.height = height
  canvasElement.style.cssText = 'position: absolute;'
  return canvasElement
}
