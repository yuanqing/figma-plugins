/** @jsx h */
import {
  LoadingIndicator,
  Text,
  imageIcon,
  ESCAPE_KEY_CODE
} from '@create-figma-plugin/ui'
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import styles from './insert-big-image.scss'
import { computeDimensions } from '../utilities/compute-dimensions'
import { createImageFromFile } from '../utilities/create-image-from-file'
import { splitImage } from '../utilities/split-image'
import { trimExtension } from '../utilities/trim-extension'

export function InsertBigImage () {
  const [isLoading, setIsLoading] = useState(false)
  async function handleChange (event) {
    setIsLoading(true)
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
  return isLoading === false ? (
    <label class={styles.container}>
      <div>
        <input
          class={styles.input}
          type='file'
          accept='image/png, image/jpeg'
          onChange={handleChange}
        />
        <div class={styles.icon}>{imageIcon}</div>
        <Text>
          Click to select a <code>png</code> or <code>jpeg</code> file
        </Text>
      </div>
    </label>
  ) : (
    <div class={styles.container}>
      <div>
        <div class={styles.loadingIndicator}>
          <LoadingIndicator />
        </div>
        <Text>Processing image…</Text>
      </div>
    </div>
  )
}
