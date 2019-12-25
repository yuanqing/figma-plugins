/** @jsx h */
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Layer,
  SearchTextbox,
  Text,
  VerticalSpace,
  useForm,
  DOWN_KEY_CODE,
  UP_KEY_CODE
} from '@create-figma-plugin/ui'
import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'
import styles from './replace-with-component.scss'

export function ReplaceWithComponent (initialState) {
  function submitCallback ({ selectedLayerId, shouldResizeToFitLayer }) {
    triggerEvent('SUBMIT', {
      selectedLayerId,
      shouldResizeToFitLayer
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    {
      ...initialState,
      filteredLayers: [].concat(initialState.layers),
      searchTerm: '',
      selectedLayerId: null
    },
    submitCallback,
    closeCallback,
    true
  )
  const {
    layers,
    filteredLayers,
    searchTerm,
    selectedLayerId,
    shouldResizeToFitLayer
  } = inputs
  function handleSearchTermChange (value) {
    handleInput(value, 'searchTerm')
    const filteredLayers = filterLayersByName(layers, value)
    handleInput(filteredLayers, 'filteredLayers')
    if (filteredLayers.length === 1) {
      handleInput(filteredLayers[0].id, 'selectedLayerId')
    }
  }
  function handleLayerClick (event) {
    const selectedLayerId = event.target.getAttribute('data-layer-id')
    handleInput(selectedLayerId, 'selectedLayerId')
  }
  const handleKeyDown = useCallback(
    function (event) {
      if (event.keyCode === UP_KEY_CODE || event.keyCode === DOWN_KEY_CODE) {
        event.preventDefault()
        if (selectedLayerId === null) {
          if (event.keyCode === UP_KEY_CODE) {
            handleInput(
              filteredLayers[filteredLayers.length - 1].id,
              'selectedLayerId'
            )
            return
          }
          handleInput(filteredLayers[0].id, 'selectedLayerId')
          return
        }
        const currentIndex = filteredLayers.findIndex(function ({ id }) {
          return id === selectedLayerId
        })
        let nextIndex = currentIndex + (event.keyCode === UP_KEY_CODE ? -1 : 1)
        if (nextIndex === -1) {
          nextIndex = filteredLayers.length - 1
        }
        if (nextIndex === filteredLayers.length) {
          nextIndex = 0
        }
        handleInput(filteredLayers[nextIndex].id, 'selectedLayerId')
      }
    },
    [filteredLayers, handleInput, selectedLayerId]
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ layers }) {
        handleInput(layers, 'layers')
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
    selectedLayerId === null ||
    filteredLayers.findIndex(function ({ id }) {
      return id === selectedLayerId
    }) === -1
  return (
    <div>
      <SearchTextbox
        onChange={handleSearchTermChange}
        propagateEscapeKeyDown
        placeholder='Search'
        value={searchTerm}
        focused
      />
      <Divider />
      {filteredLayers.length === 0 ? (
        <div class={styles.emptyState}>
          <Text muted align='center'>
            No results for “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div class={styles.layers}>
          {filteredLayers.map(function ({ id, name }, index) {
            return (
              <Layer
                key={index}
                type='component'
                data-layer-id={id}
                selected={id === selectedLayerId}
                onClick={handleLayerClick}
              >
                {name}
              </Layer>
            )
          })}
        </div>
      )}
      <Divider />
      <Container space='medium'>
        <VerticalSpace space='medium' />
        <Checkbox
          name='shouldResizeToFitLayer'
          value={shouldResizeToFitLayer === true}
          onChange={handleInput}
        >
          <Text>Resize component to fit layer</Text>
        </Checkbox>
        <VerticalSpace space='medium' />
        <Button
          fullWidth
          disabled={isSubmitButtonDisabled}
          onClick={handleSubmit}
        >
          Replace With Component
        </Button>
      </Container>
    </div>
  )
}

function filterLayersByName (layers, searchTerm) {
  if (searchTerm === '') {
    return layers
  }
  return layers.filter(function ({ name }) {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  })
}
