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
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    {
      ...initialState,
      filteredLayers: initialState.layers,
      searchTerm: '',
      selectedLayerId: null
    },
    {
      transform: function (state) {
        const { layers, searchTerm, selectedLayerId } = state
        const filteredLayers = filterLayersByName(layers, searchTerm)
        return {
          ...state,
          filteredLayers,
          selectedLayerId:
            filteredLayers.length === 1 ? filteredLayers[0].id : selectedLayerId
        }
      },
      validate: function ({ filteredLayers, selectedLayerId }) {
        return (
          selectedLayerId !== null &&
          filteredLayers.findIndex(function ({ id }) {
            return id === selectedLayerId
          }) !== -1
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ selectedLayerId, shouldResizeToFitLayer }) {
        triggerEvent('SUBMIT', {
          selectedLayerId,
          shouldResizeToFitLayer
        })
      }
    }
  )
  const {
    filteredLayers,
    searchTerm,
    selectedLayerId,
    shouldResizeToFitLayer
  } = state
  const handleLayerClick = useCallback(
    function (event) {
      const selectedLayerId = event.target.getAttribute('data-layer-id')
      handleChange({ selectedLayerId })
    },
    [handleChange]
  )
  const handleKeyDown = useCallback(
    function (event) {
      if (event.keyCode === UP_KEY_CODE || event.keyCode === DOWN_KEY_CODE) {
        event.preventDefault()
        if (selectedLayerId === null) {
          if (event.keyCode === UP_KEY_CODE) {
            handleChange({
              selectedLayerId: filteredLayers[filteredLayers.length - 1].id
            })
            return
          }
          handleChange({ selectedLayerId: filteredLayers[0].id })
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
        handleChange({ selectedLayerId: filteredLayers[nextIndex].id })
      }
    },
    [filteredLayers, handleChange, selectedLayerId]
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ layers }) {
        handleChange({ layers })
      })
    },
    [handleChange]
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
  return (
    <div>
      <SearchTextbox
        name='searchTerm'
        onChange={handleChange}
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
          onChange={handleChange}
        >
          <Text>Resize component to fit layer</Text>
        </Checkbox>
        <VerticalSpace space='medium' />
        <Button
          fullWidth
          disabled={isInvalid() === true}
          onClick={handleSubmit}
        >
          Replace With Component
        </Button>
        <VerticalSpace space='small' />
      </Container>
    </div>
  )
}

function filterLayersByName (layers, searchTerm) {
  if (searchTerm === '') {
    return layers
  }
  console.log(layers, searchTerm)
  return layers.filter(function ({ name }) {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  })
}
