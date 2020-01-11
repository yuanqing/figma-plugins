/* global FileReader */

export async function splitImage (image, widths, heights) {
  const canvasElement = createCanvasElementFromImage(image)
  const context = canvasElement.getContext('2d')
  const promises = []
  let y = 0
  for (const height of heights) {
    let x = 0
    for (const width of widths) {
      const imageData = context.getImageData(x, y, width, height)
      promises.push(encodeImage(imageData, x, y, width, height))
      x += width
    }
    y += height
  }
  document.body.removeChild(canvasElement)
  return Promise.all(promises)
}

function createCanvasElementFromImage (image) {
  const canvasElement = document.createElement('canvas')
  document.body.appendChild(canvasElement)
  canvasElement.width = image.width
  canvasElement.height = image.height
  canvasElement.getContext('2d').drawImage(image, 0, 0)
  return canvasElement
}

async function encodeImage (imageData, x, y, width, height) {
  const canvasElement = document.createElement('canvas')
  document.body.appendChild(canvasElement)
  canvasElement.getContext('2d').putImageData(imageData, 0, 0)
  const result = await new Promise(function (resolve, reject) {
    canvasElement.toBlob(function (blob) {
      const reader = new FileReader()
      reader.onload = function () {
        resolve([new Uint8Array(reader.result), x, y, width, height])
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(blob)
    })
  })
  document.body.removeChild(canvasElement)
  return result
}
