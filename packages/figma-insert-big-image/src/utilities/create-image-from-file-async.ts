/* global Image */

export async function createImageFromFileAsync (
  file
): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    const imageElement = new Image()
    imageElement.onload = function () {
      resolve(imageElement)
    }
    imageElement.onerror = reject
    imageElement.src = URL.createObjectURL(file)
  })
}
