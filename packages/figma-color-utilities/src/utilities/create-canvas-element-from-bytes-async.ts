export async function createCanvasElementFromBytesAsync(
  bytes: Uint8Array
): Promise<HTMLCanvasElement> {
  const imageElement = await createImageElementFromBytesAsync(bytes)
  const canvasElement = createCanvasElement(
    imageElement.width,
    imageElement.height
  )
  const context = canvasElement.getContext('2d') as CanvasRenderingContext2D
  context.drawImage(imageElement, 0, 0)
  return canvasElement
}

async function createImageElementFromBytesAsync(
  bytes: Uint8Array
): Promise<HTMLImageElement> {
  const blob: Blob = new Blob([bytes])
  return new Promise(function (resolve, reject) {
    const imageElement = new Image()
    imageElement.onload = function (): void {
      resolve(imageElement)
    }
    imageElement.onerror = reject
    imageElement.src = URL.createObjectURL(blob)
  })
}

function createCanvasElement(width: number, height: number): HTMLCanvasElement {
  const canvasElement = document.createElement('canvas')
  document.body.appendChild(canvasElement)
  canvasElement.width = width
  canvasElement.height = height
  canvasElement.style.cssText = 'position: absolute;'
  return canvasElement
}
