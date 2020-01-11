/** @jsx h */
import { Text, ESCAPE_KEY_CODE } from '@create-figma-plugin/ui'
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import styles from './insert-big-image.scss'
import { computeDimensions } from '../utilities/compute-dimensions'
import { createImageFromFile } from '../utilities/create-image-from-file'
import { splitImage } from '../utilities/split-image'
import { trimExtension } from '../utilities/trim-extension'

export function InsertBigImage () {
  async function handleChange (event) {
    const file = event.target.files[0]
    const image = await createImageFromFile(file)
    const widths = computeDimensions(image.width)
    const heights = computeDimensions(image.height)
    const images = await splitImage(image, widths, heights)
    const name = trimExtension(file.name)
    triggerEvent('SUBMIT', { images, name })
  }
  function handleKeyDown (event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      triggerEvent('CLOSE')
    }
  }
  useEffect(function () {
    window.addEventListener('keydown', handleKeyDown)
    return function () {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <label class={styles.label}>
      <input
        class={styles.input}
        type='file'
        accept='image/png, image/jpeg'
        onChange={handleChange}
      />
      <Text muted>
        Click to select a <code>png</code> or <code>jpeg</code> file
      </Text>
    </label>
  )
}
