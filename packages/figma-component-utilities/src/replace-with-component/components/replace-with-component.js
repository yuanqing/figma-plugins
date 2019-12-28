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
  useMenu
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
      const componentId = event.target.getAttribute('data-id')
      handleChange({ componentId })
    },
    [handleChange]
  )
  const { handleKeyDown, menuElementRef } = useMenu({
    getSelectedItemElement: function (menuElement, selectedItem) {
      return menuElement.querySelector(`[data-id='${selectedItem}']`)
    },
    onChange: function (componentId) {
      handleChange({ componentId })
    },
    items: filteredComponents.map(function ({ id }) {
      return id
    }),
    selectedItem: componentId
  })
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
        <div class={styles.layers} ref={menuElementRef}>
          {filteredComponents.map(function ({ id, name, pageName }, index) {
            return (
              <Layer
                key={index}
                type='component'
                data-id={id}
                pageName={pageName}
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
