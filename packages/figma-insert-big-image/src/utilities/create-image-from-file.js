/* global Image */

export async function createImageFromFile (file) {
  return new Promise(function (resolve, reject) {
    const imageElement = new Image()
    imageElement.onload = function () {
      resolve(imageElement)
    }
    imageElement.onerror = reject
    imageElement.src = URL.createObjectURL(file)
  })
}
