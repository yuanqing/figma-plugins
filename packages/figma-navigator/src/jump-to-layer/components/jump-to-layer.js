/** @jsx h */
import {
  Button,
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
import styles from './jump-to-layer.scss'

export function JumpToLayer (initialState) {
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    {
      ...initialState,
      filteredLayers: [].concat(initialState.layers),
      searchTerm: ''
    },
    {
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
      onSubmit: function ({ selectedLayerId }) {
        if (selectedLayerId === null) {
          return
        }
        triggerEvent('SUBMIT', {
          selectedLayerId
        })
      }
    }
  )
  const { layers, filteredLayers, selectedLayerId, searchTerm } = state
  function handleSearchTermChange (searchTerm) {
    const filteredLayers = filterLayersByName(layers, searchTerm)
    handleChange({ searchTerm, filteredLayers }, 'searchTerm')
    if (filteredLayers.length === 1) {
      handleChange({ selectedLayerId: filteredLayers[0].id })
    }
  }
  function handleLayerClick (event) {
    const selectedLayerId = event.target.getAttribute('data-layer-id')
    handleChange({ selectedLayerId })
  }
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
        onKeyDown={handleKeyDown}
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
          {filteredLayers.map(function ({ id, name, type }, index) {
            return (
              <Layer
                key={index}
                type={type.toLowerCase()}
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
        <VerticalSpace space='small' />
        <Button
          fullWidth
          disabled={isInvalid() === true}
          onClick={handleSubmit}
        >
          Jump to Component/Frame
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
  return layers.filter(function ({ name }) {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  })
}
