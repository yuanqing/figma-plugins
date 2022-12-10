import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import { ImagePlainObject } from './types.js'

export async function saveImagesAsync(options: {
  images: Array<ImagePlainObject>
  zipFileName: string
}) {
  const { images, zipFileName } = options
  if (images.length === 1) {
    saveImageFile(images[0])
    return
  }
  await saveImageFilesAsync({ images, zipFileName })
}

function saveImageFile(image: ImagePlainObject) {
  const fileName = createImageFileName(image)
  saveAs(new Blob([image.bytes]), fileName)
}

async function saveImageFilesAsync(options: {
  images: Array<ImagePlainObject>
  zipFileName: string
}) {
  const { images, zipFileName } = options
  const usedFileNames: Record<string, boolean> = {}
  const zip = new JSZip()
  for (const image of images) {
    const fileName = resolveImageFileName(image, usedFileNames)
    usedFileNames[fileName] = true
    zip.file(`${zipFileName}/${fileName}`, image.bytes)
  }
  const file = await zip.generateAsync({ type: 'blob' })
  saveAs(file, `${zipFileName}.zip`)
}

function resolveImageFileName(
  image: ImagePlainObject,
  usedFileNames: Record<string, boolean>
): string {
  const fileName = createImageFileName(image)
  if (usedFileNames[fileName] !== true) {
    return fileName
  }
  let index = 1
  let newFileName: string
  do {
    index += 1
    newFileName = createImageFileName({
      ...image,
      name: `${image.name} ${index}`
    })
  } while (usedFileNames[newFileName] === true)
  return newFileName
}

function createImageFileName(image: ImagePlainObject) {
  const { name, suffix, format } = image
  return `${name}${suffix === null ? '' : suffix}.${format.toLowerCase()}`
}
