/** @jsx h */
import {
  LoadingIndicator,
  Text,
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
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(null)
  async function handleFiles (event) {
    const files = event.target.files
    const total = files.length
    setTotal(total)
    let current = 0
    for (const file of files) {
      current++
      setCurrent(current)
      const image = await createImageFromFile(file)
      const widths = computeDimensions(image.width)
      const heights = computeDimensions(image.height)
      const images = await splitImage(image, widths, heights)
      const name = trimExtension(file.name)
      triggerEvent('INSERT_BIG_IMAGE', {
        images,
        name,
        width: image.width,
        isDone: current === total
      })
    }
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
  return total === 0 ? (
    <label class={styles.container}>
      <div>
        <input
          class={styles.input}
          type='file'
          accept='image/png, image/jpeg'
          multiple
          onChange={handleFiles}
        />
        <Text align='center'>
          Click to select <code>png</code> or <code>jpeg</code> files
        </Text>
      </div>
    </label>
  ) : (
    <div class={styles.container}>
      <div>
        <div class={styles.loadingIndicator}>
          <LoadingIndicator />
        </div>
        <Text align='center'>
          {total === 1
            ? 'Processing image…'
            : `Processing image ${current} of ${total}`}
        </Text>
      </div>
    </div>
  )
}
