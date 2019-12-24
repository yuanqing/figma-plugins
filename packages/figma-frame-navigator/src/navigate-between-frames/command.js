/* global figma */
import {
  formatErrorMessage,
  loadSettings
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { getAllTopLevelFrames } from '../utilities/get-all-top-level-frames'
import { getSelectedTopLevelFrames } from '../utilities/get-selected-top-level-frames'

export const goToPreviousFrame = commandFactory(1, 'At first frame on page')
export const goToNextFrame = commandFactory(-1, 'At last frame on page')

function commandFactory (indexOffset, noMoreFramesMessage) {
  return async function () {
    const settings = await loadSettings(defaultSettings)
    const { loop } = settings
    if (figma.currentPage.selection.length === 0) {
      figma.closePlugin(formatErrorMessage('Select a frame'))
      return
    }
    const selectedFrames = getSelectedTopLevelFrames()
    if (selectedFrames.length > 1) {
      figma.closePlugin(formatErrorMessage('Select only one frame'))
      return
    }
    const frames = getAllTopLevelFrames()
    if (frames.length === 1) {
      figma.viewport.scrollAndZoomIntoView(frames)
      figma.closePlugin(formatErrorMessage('No other frames on page'))
      return
    }
    const nextFrame = getNextFrame(selectedFrames[0], indexOffset, loop)
    if (nextFrame === null) {
      figma.viewport.scrollAndZoomIntoView(selectedFrames)
      figma.closePlugin(noMoreFramesMessage)
      return
    }
    figma.viewport.scrollAndZoomIntoView([nextFrame])
    figma.currentPage.selection = [nextFrame]
    figma.closePlugin()
  }
}

function getNextFrame (currentFrame, indexOffset, loop) {
  const frames = getAllTopLevelFrames()
  const currentIndex = frames.indexOf(currentFrame)
  const nextIndex = currentIndex + indexOffset
  if (nextIndex === -1) {
    return loop === true ? frames[frames.length - 1] : null
  }
  if (nextIndex === frames.length) {
    return loop === true ? frames[0] : null
  }
  return frames[nextIndex]
}
