/* global Image */

export async function createImageElementFromFileAsync(
  file: File
): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    const imageElement = new Image()
    imageElement.onload = function (): void {
      resolve(imageElement)
    }
    imageElement.onerror = reject
    imageElement.src = URL.createObjectURL(file)
  })
}
