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
      componentId: null,
      filteredComponents: initialState.components,
      searchTerm: ''
    },
    {
      transform: function (state) {
        const { componentId, components, searchTerm } = state
        const filteredComponents = filterLayersByName(components, searchTerm)
        return {
          ...state,
          componentId:
            filteredComponents.length === 1
              ? filteredComponents[0].id
              : componentId,
          filteredComponents
        }
      },
      validate: function ({ componentId, filteredComponents, selectedLayers }) {
        return (
          componentId !== null &&
          selectedLayers.length > 0 &&
          selectedLayers.filter(function ({ id }) {
            return id !== componentId
          }).length > 0 &&
          filteredComponents.findIndex(function ({ id }) {
            return id === componentId
          }) !== -1
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ componentId, shouldResizeToFitLayer }) {
        triggerEvent('SUBMIT', {
          componentId,
          shouldResizeToFitLayer
        })
      }
    }
  )
  const {
    componentId,
    filteredComponents,
    searchTerm,
    shouldResizeToFitLayer
  } = state
  const handleLayerClick = useCallback(
    function (event) {
      const componentId = event.target.getAttribute('data-layer-id')
      handleChange({ componentId })
    },
    [handleChange]
  )
  const handleKeyDown = useCallback(
    function (event) {
      if (event.keyCode === UP_KEY_CODE || event.keyCode === DOWN_KEY_CODE) {
        event.preventDefault()
        if (componentId === null) {
          if (event.keyCode === UP_KEY_CODE) {
            handleChange({
              componentId: filteredComponents[filteredComponents.length - 1].id
            })
            return
          }
          handleChange({ componentId: filteredComponents[0].id })
          return
        }
        const currentIndex = filteredComponents.findIndex(function ({ id }) {
          return id === componentId
        })
        let nextIndex = currentIndex + (event.keyCode === UP_KEY_CODE ? -1 : 1)
        if (nextIndex === -1) {
          nextIndex = filteredComponents.length - 1
        }
        if (nextIndex === filteredComponents.length) {
          nextIndex = 0
        }
        handleChange({ componentId: filteredComponents[nextIndex].id })
      }
    },
    [filteredComponents, handleChange, componentId]
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({
        components,
        selectedLayers
      }) {
        handleChange({ components, selectedLayers })
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
      {filteredComponents.length === 0 ? (
        <div class={styles.emptyState}>
          <Text muted align='center'>
            No results for “{searchTerm}”
          </Text>
        </div>
      ) : (
        <div class={styles.layers}>
          {filteredComponents.map(function ({ id, name }, index) {
            return (
              <Layer
                key={index}
                type='component'
                data-layer-id={id}
                selected={id === componentId}
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
  return layers.filter(function ({ name }) {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  })
}
