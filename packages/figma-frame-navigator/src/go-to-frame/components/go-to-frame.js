/** @jsx h */
import {
  Button,
  Container,
  Divider,
  SearchTextbox,
  SelectableItem,
  Text,
  VerticalSpace,
  useForm,
  UP_KEY_CODE,
  DOWN_KEY_CODE
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'
import styles from './go-to-frame.scss'

export function GoToFrame (initialState) {
  function submitCallback ({ selectedFrameId }) {
    triggerEvent('SUBMIT', {
      selectedFrameId
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    {
      ...initialState,
      filteredFrames: [].concat(initialState.frames),
      searchTerm: ''
    },
    submitCallback,
    closeCallback,
    true
  )
  const { frames, filteredFrames, selectedFrameId, searchTerm } = inputs
  function handleSearchTermChange (value, name) {
    handleInput(value, name)
    const filteredFrames = filterFramesByName(frames, value)
    handleInput(filteredFrames, 'filteredFrames')
    if (filteredFrames.length === 1) {
      handleInput(filteredFrames[0].id, 'selectedFrameId')
    }
  }
  function handleItemClick (event) {
    const selectedFrameId = event.target.getAttribute('data-frame-id')
    handleInput(selectedFrameId, 'selectedFrameId')
  }

  const handleKeyDown = useCallback(
    function (event) {
      if (event.keyCode === UP_KEY_CODE || event.keyCode === DOWN_KEY_CODE) {
        event.preventDefault()
        if (selectedFrameId === null) {
          if (event.keyCode === UP_KEY_CODE) {
            handleInput(
              filteredFrames[filteredFrames.length - 1].id,
              'selectedFrameId'
            )
            return
          }
          handleInput(filteredFrames[0].id, 'selectedFrameId')
          return
        }
        const currentIndex = filteredFrames.findIndex(function ({ id }) {
          return id === selectedFrameId
        })
        let nextIndex = currentIndex + (event.keyCode === UP_KEY_CODE ? -1 : 1)
        if (nextIndex === -1) {
          nextIndex = filteredFrames.length - 1
        }
        if (nextIndex === filteredFrames.length) {
          nextIndex = 0
        }
        handleInput(filteredFrames[nextIndex].id, 'selectedFrameId')
      }
    },
    [filteredFrames, handleInput, selectedFrameId]
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ frames }) {
        handleInput(frames, 'frames')
      })
    },
    [handleInput]
  )
  useEffect(
    function () {
      window.addEventListener('keydown', handleKeyDown)
      return function () {
        window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [handleKeyDown]
  )
  const isSubmitButtonDisabled =
    selectedFrameId === null ||
    filteredFrames.findIndex(function ({ id }) {
      return id === selectedFrameId
    }) === -1
  return (
    <div>
      <SearchTextbox
        name='searchTerm'
        onKeyDown={handleKeyDown}
        onChange={handleSearchTermChange}
        propagateEscapeKeyDown
        placeholder='Search'
        value={searchTerm}
        focused
      />
      <Divider />
      {filteredFrames.length === 0 ? (
        <div class={styles.emptyState}>
          <Text muted align='center'>
            No results for “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div class={styles.frames}>
          {filteredFrames.map(function ({ id, name }, index) {
            return (
              <SelectableItem
                key={index}
                data-frame-id={id}
                selected={id === selectedFrameId}
                onClick={handleItemClick}
              >
                {name}
              </SelectableItem>
            )
          })}
        </div>
      )}
      <Divider />
      <Container space='medium'>
        <VerticalSpace space='small' />
        <Button
          fullWidth
          disabled={isSubmitButtonDisabled}
          onClick={handleSubmit}
        >
          Go to Frame
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </div>
  )
}

function filterFramesByName (frames, searchTerm) {
  if (searchTerm === '') {
    return frames
  }
  return frames.filter(function ({ name }) {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  })
}
