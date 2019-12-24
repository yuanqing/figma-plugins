/** @jsx h */
import {
  Button,
  Container,
  Divider,
  SearchTextbox,
  SelectableItem,
  Text,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
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
      selectedFrameId: null,
      searchTerm: ''
    },
    submitCallback,
    closeCallback,
    true
  )
  const { frames, selectedFrameId, searchTerm } = inputs
  function handleSearchTermChange (value, name) {
    const result = filterFramesByName(frames, value)
    handleInput(
      result.length === 1 ? result[0].id : selectedFrameId,
      'selectedFrameId'
    )
    handleInput(value, name)
  }
  function handleItemClick (event) {
    const selectedFrameId = event.target.getAttribute('data-frame-id')
    handleInput(selectedFrameId, 'selectedFrameId')
  }
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ frames }) {
        handleInput(frames, 'frames')
      })
    },
    [handleInput]
  )
  /* eslint-disable indent */
  const result = filterFramesByName(frames, searchTerm)
  /* eslint-enable indent */
  const isSubmitButtonDisabled =
    selectedFrameId === null ||
    result.findIndex(function ({ id }) {
      return id === selectedFrameId
    }) === -1
  return (
    <div>
      <SearchTextbox
        name='searchTerm'
        onChange={handleSearchTermChange}
        propagateEscapeKeyDown
        placeholder='Search'
        value={searchTerm}
        focused
      />
      <Divider />
      {result.length === 0 ? (
        <div class={styles.emptyState}>
          <Text muted align='center'>
            No results for “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div class={styles.frames}>
          {result.map(function ({ id, name }, index) {
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
